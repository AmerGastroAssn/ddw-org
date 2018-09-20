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


    CkeditorConfig = {
        allowedContent: true,
        height: 400,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

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
                    sortOrder: [''],
                    published: ['' || false],
                    publishOn: [pr.publishOn, Validators.required],
                    summary: [pr.summary],
                    title: [pr.title, Validators.required],
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
