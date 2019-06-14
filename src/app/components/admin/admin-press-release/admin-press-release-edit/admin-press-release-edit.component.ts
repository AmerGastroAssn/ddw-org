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
    selector: 'ddw-admin-press-release-edit',
    templateUrl: './admin-press-release-edit.component.html',
    styleUrls: ['./admin-press-release-edit.component.css']
})
export class AdminPressReleaseEditComponent implements OnInit {
    editPressReleaseForm: FormGroup;
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
    currentDate: number;
    placeholderDate: any;
    metaDesc: string;
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
        // Get id from url
        this.url = this.route.snapshot.params['id'];

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {
                this.author = this.authService.getProfile().email;
            }
        });

        this.user = this.authService.getProfile();
        this.currentDate = Date.now();

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

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm',
              placeholder: this.currentDate
          });
    }

    // For Form Validations
    get f() {
        return this.editPressReleaseForm.controls;
    }


    ngOnInit() {
        // Get Page
        this.adminPressReleaseService.getPressRelease(this.url).subscribe((pr) => {
            if (pr !== null) {
                this.pressRelease = pr;
                const newURL: string = this.adminPressReleaseService.string_to_slug(pr.title);

                // Form:
                this.editPressReleaseForm = this.fb.group({
                    author: [pr.author],
                    createdAt: [this.currentDate],
                    body: [pr.body, Validators.required],
                    sortOrder: [pr.sortOrder],
                    published: [pr.published || false],
                    publishOn: [pr.publishOn, Validators.required],
                    summary: [pr.summary],
                    title: [pr.title, Validators.required],
                    metaDesc: [pr.metaDesc],
                });


                this.$key = this.pressRelease.$key;
                this.author = this.editPressReleaseForm.value.author;
                this.createdAt = this.editPressReleaseForm.value.createdAt;
                this.body = this.editPressReleaseForm.value.body;
                this.sortOrder = this.editPressReleaseForm.value.sortOrder;
                this.published = this.editPressReleaseForm.value.published;
                this.publishOn = this.editPressReleaseForm.value.publishOn;
                this.title = this.editPressReleaseForm.value.title;
                this.uid = this.pressRelease.uid;
                this.url = this.pressRelease.url;
                this.metaDesc = this.pressRelease.metaDesc;
            }
        });

    }

    onAddEditPressRelease(formData) {
        if (!this.editPressReleaseForm.valid) {
            this.sbAlert.open('Missing at least one input, Press Release was NOT updated.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.adminPressReleaseService.updatePressRelease(formData, this.uid);
            console.log(formData);
            this.editPressReleaseForm.reset();
            this.sbAlert.open('Press Release updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

}
