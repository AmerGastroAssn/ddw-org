import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { PressRelease } from '../../../../models/PressRelease';
import { User } from '../../../../models/User';
import { AdminPressReleaseService } from '../../../../services/admin-press-release.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'ddw-admin-press-release-new',
    templateUrl: './admin-press-release-new.component.html',
    styleUrls: ['./admin-press-release-new.component.css']
})
export class AdminPressReleaseNewComponent implements OnInit {
    newPressReleaseForm: FormGroup;
    user: User;
    pressRelease: PressRelease;
    $key: string;
    author: string;
    createdAt: number;
    body: string;
    sortOrder: number;
    published: boolean;
    publishOn: any;
    summary: string;
    title: string;
    uid: string;
    url: string;
    bsConfig: Partial<BsDatepickerConfig>;
    metaDesc: string;
    currentDate: number;
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;

    constructor(
      private adminPressReleaseService: AdminPressReleaseService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private authService: AuthService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
    ) {
        this.mceApiKey = environment.mceApiKey;
        this.mceConfig = {
            height: 700,
            plugins: 'code, codesample, lists, tinymcespellchecker, link, preview, fullscreen, advcode',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'SASS', value: 'sass' },
                { text: 'SCSS', value: 'scss' },
                { text: 'TypeScript', value: 'typescript' },
            ],
            // tslint:disable-next-line:max-line-length
            toolbar: 'undo redo fontsizeselect styleselect bold italic link unlink openLink forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent fullscreen code preview',
            body_id: 'tiny-mce-textarea',
            // tslint:disable-next-line:max-line-length
            content_style: `body{font-family:'Open Sans',Roboto,'Helvetica Neue',sans-serif!important;line-height:2rem!important;font-size:1.1rem!important}a,a:link{color:#2e6da4}a.btn.btn-warning.btn-lg{background-color:#f47700;color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:700;text-decoration:none;padding:.5em 2em;font-size:18px}a.btn.btn-warning.btn-lg:hover{background-color:#feb512;color:#004060;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:400;text-decoration:none;padding:.5em 2em;font-size:18px}h1,h2,h3{font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:600}
                `,
            content_css: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
        };

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {
                this.author = this.authService.getProfile().email;
            }
        });

        this.uid = this.afs.createId();
        this.user = this.authService.getProfile();
        this.currentDate = Date.now();

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm a',
              placeholder: this.currentDate,
          });
    }

    // For Form Validations
    get f() {
        return this.newPressReleaseForm.controls;
    }


    ngOnInit() {
        // Form:
        this.newPressReleaseForm = this.fb.group({
            author: ['' || this.author],
            createdAt: [this.currentDate],
            body: ['', Validators.required],
            sortOrder: [''],
            published: ['' || false],
            publishOn: ['', Validators.required],
            summary: [''],
            title: ['', Validators.required],
            metaDesc: ['', Validators.required],
        });

        this.author = this.newPressReleaseForm.value.author;
        this.createdAt = this.newPressReleaseForm.value.createdAt;
        this.body = this.newPressReleaseForm.value.body;
        this.sortOrder = this.newPressReleaseForm.value.sortOrder;
        this.published = this.newPressReleaseForm.value.published;
        this.publishOn = this.newPressReleaseForm.value.publishOn;
        this.title = this.newPressReleaseForm.value.title;
        this.metaDesc = this.newPressReleaseForm.value.metaDesc;


    }

    onAddNewPressRelease(formData) {
        if (!this.newPressReleaseForm.valid) {
            this.sbAlert.open('Missing at least one input, Press Release was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.adminPressReleaseService.setPressRelease(formData);
            console.log(formData);
            this.newPressReleaseForm.reset();
            this.sbAlert.open('New Press Release created!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

}
