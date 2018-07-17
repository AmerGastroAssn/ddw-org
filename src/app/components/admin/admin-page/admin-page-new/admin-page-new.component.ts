import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Page } from '../../../../models/Page';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-admin-page-new',
    templateUrl: './admin-page-new.component.html',
    styleUrls: ['./admin-page-new.component.css']
})
export class AdminPageNewComponent implements OnInit {
    user: User;
    page: Page;
    newPageForm: FormGroup;
    title: string;
    author: string;
    date: number;
    photoURL: string;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    disableAdminOnNew: boolean;
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
      private authService: AuthService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {

            }
        });

        this.uid = this.afs.createId();
        this.user = this.authService.getProfile();
    }

    // For Form Validations
    get f() {
        return this.newPageForm.controls;
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
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;

        // Form:
        this.newPageForm = this.fb.group({
            title: ['',
                    Validators.compose([
                        Validators.required, Validators.minLength(5)
                    ])
            ],
            body: ['',
                   Validators.compose([
                       Validators.required, Validators.minLength(100)
                   ])
            ],
            author: ['' || this.user.email, Validators.required],
            date: [''],
            photoURL: ['' || 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg'],
            category: ['' || 'Register', Validators.required],
            published: [''],
            template: ['' || 'Full Width', Validators.required]
        });

        this.title = this.newPageForm.value.title;
        this.body = this.newPageForm.value.body;
        this.author = this.newPageForm.value.author;
        this.date = this.newPageForm.value.date;
        this.photoURL = this.newPageForm.value.photoURL;
        this.category = this.newPageForm.value.category;
        this.published = this.newPageForm.value.published;
        this.template = this.newPageForm.value.template;
    }


    onAddNewPage(formData) {
        if (!this.newPageForm.valid) {
            this.flashMessage.show('Something went wrong, Page was not created.', {
                cssClass: 'alert-danger',
                timeout: 3500
            });
        } else {
            this.pageService.setPage(formData);
            console.log(formData);
            this.newPageForm.reset();
            this.flashMessage.show(`${formData.title} was created!`, {
                cssClass: 'alert-success',
                timeout: 3500
            });
        }
    }

}
