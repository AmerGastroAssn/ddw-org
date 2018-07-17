import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Page } from '../../../../models/Page';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { PageService } from '../../../../services/page.service';


@Component({
    selector: 'ddw-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css'],
})
export class AdminPageEditComponent implements OnInit {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
    page: Page;
    editPageForm: FormGroup;
    $key: string;
    title: string;
    author: string;
    date: string;
    photoURL: any;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    disableAdminOnEdit: boolean;
    color = 'primary';
    mode: 'determinate';
    value: string;
    // Image upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;


    constructor(
      private pageService: PageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private storage: AngularFireStorage,
      private sanitizer: DomSanitizer
    ) {
    }

    // For Form Validations
    get f() {
        return this.editPageForm.controls;
    }


    uploadImage(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        // The file's download URL
        this.task.snapshotChanges().pipe(
          finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
          })
        )
            .subscribe();
    }

    ngOnInit() {
        console.log(this.downloadURL);
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get Page
        this.pageService.getPage(this.uid).subscribe((page) => {
            if (page !== null) {
                this.page = page;

                // Form:
                this.editPageForm = this.fb.group({
                    uid: [this.page.uid],
                    title: [this.page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.page.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(100)
                           ])
                    ],
                    author: [this.page.author, Validators.required],
                    date: [this.page.date],
                    photoURL: [this.photoURL, Validators.required],
                    category: [this.page.category || ''],
                    published: [this.page.published || false],
                    template: [this.page.template, Validators.required],
                });

                this.uid = this.editPageForm.value.uid;
                this.title = this.editPageForm.value.title;
                this.body = this.editPageForm.value.body;
                this.author = this.editPageForm.value.author;
                this.date = this.editPageForm.value.date;
                this.photoURL = this.editPageForm.value.photoURL;
                this.category = this.editPageForm.value.category;
                this.published = this.editPageForm.value.published;
                this.template = this.editPageForm.value.template;
            }
        });
    }

    onUpdatePage(formData) {
        if (!this.editPageForm.valid) {
            this.flashMessage.show('Something went wrong, Page was not updated.', {
                cssClass: 'alert-danger',
                timeout: 3500
            });
        } else {
            this.pageService.updatePage(formData, this.page.uid);
            this.editPageForm.reset();
            this.flashMessage.show(`${formData.title} was updated!`, {
                cssClass: 'alert-success',
                timeout: 3500
            });
        }
    }

    @HostListener('window:scroll')
    onScrollEvent() {
        this.datepicker.hide();
    }

    onFileSelection(event) {
        // this.pageService.fileSelection(event);
    }

}
