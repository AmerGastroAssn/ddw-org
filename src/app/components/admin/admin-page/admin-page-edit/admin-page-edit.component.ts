import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';


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
    date: any;
    photoURL: any;
    bannerPhotoURL: any;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    url: string;
    disableAdminOnEdit: boolean;
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
    value: any;
    togglePagePreview = true;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;


    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private storage: AngularFireStorage,
      private sbAlert: MatSnackBar,
    ) {
        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm:ss a'
          });
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
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get Page
        this.adminPageService.getPage(this.uid).subscribe((page) => {
            if (page !== null) {
                this.page = page;
                const newURL: string = this.adminPageService.string_to_slug(page.title);

                // Form:
                this.editPageForm = this.fb.group({
                    uid: [page.uid],
                    title: [page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [page.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(100)
                           ])
                    ],
                    author: [page.author, Validators.required],
                    date: [page.date, Validators.required],
                    bannerPhotoURL: [page.bannerPhotoURL || 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg', Validators.required],
                    photoURL: [page.photoURL],
                    category: [page.category || ''],
                    published: [page.published || false],
                    template: [page.template, Validators.required],
                    url: [newURL, Validators.required],
                });

                this.uid = this.editPageForm.value.uid;
                this.title = this.editPageForm.value.title;
                this.body = this.editPageForm.value.body;
                this.author = this.editPageForm.value.author;
                this.date = this.editPageForm.value.date;
                this.bannerPhotoURL = this.editPageForm.value.bannerPhotoURL;
                this.photoURL = this.editPageForm.value.photoURL;
                this.category = this.editPageForm.value.category;
                this.published = this.editPageForm.value.published;
                this.template = this.editPageForm.value.template;
                this.url = this.editPageForm.value.url;
            }
        });
    }

    onUpdatePage(formData) {
        if (!this.editPageForm.valid) {
            this.sbAlert.open('Something went wrong, Page was not created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.adminPageService.updatePage(formData, this.page.uid);
            this.editPageForm.reset();
            this.sbAlert.open('Page was updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
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

    onTogglePagePreview() {
        this.togglePagePreview = !this.togglePagePreview;
    }

}
