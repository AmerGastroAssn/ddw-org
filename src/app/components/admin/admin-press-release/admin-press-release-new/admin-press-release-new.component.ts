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
    currentDate: number;


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
        });

        this.author = this.newPressReleaseForm.value.author;
        this.createdAt = this.newPressReleaseForm.value.createdAt;
        this.body = this.newPressReleaseForm.value.body;
        this.sortOrder = this.newPressReleaseForm.value.sortOrder;
        this.published = this.newPressReleaseForm.value.published;
        this.publishOn = this.newPressReleaseForm.value.publishOn;
        this.title = this.newPressReleaseForm.value.title;


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
