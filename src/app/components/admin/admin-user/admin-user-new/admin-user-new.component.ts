import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { AdminUserService } from '../../../../services/admin-user.service';

@Component({
    selector: 'ddw-admin-user-new',
    templateUrl: './admin-user-new.component.html',
    styleUrls: ['./admin-user-new.component.css']
})
export class AdminUserNewComponent implements OnInit {
    newUserForm: FormGroup;
    email: string;
    password: string;
    isOnline: boolean;
    loginDate: number = Date.now();
    photoURL: string;
    admin: boolean;
    displayName: string;
    title: string;
    uid: string;
    disableAdminOnNew: boolean;


    constructor(
      private adminUserService: AdminUserService,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private authService: AuthService,
      public sbAlert: MatSnackBar,
    ) {

    }

    // For Form Validations
    get f() {
        return this.newUserForm.controls;
    }

    ngOnInit() {
        // Settings:
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;

        // Form:
        this.newUserForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            displayName: ['', Validators.required],
            isOnline: [false],
            loginDate: [Date.now()],
            photoURL: ['https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
            admin: [{ value: false, disabled: this.disableAdminOnNew }],
            title: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5)
            ])],
            uid: ['']
        });

        this.email = this.newUserForm.value.email;
        this.password = this.newUserForm.value.password;
        this.isOnline = this.newUserForm.value.isOnline;
        this.loginDate = Date.now();
        this.photoURL = this.newUserForm.value.photoURL;
        this.admin = this.newUserForm.value.admin;
        this.title = this.newUserForm.value.title;
        this.displayName = this.newUserForm.value.displayName;
        this.uid = this.newUserForm.value.uid;
    }

    onAddNewUser(formData) {
        if (!this.newUserForm.valid) {
            this.sbAlert.open('Something went wrong, user was not created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.authService.addUser(formData)
                .then(() => {
                    this.sbAlert.open('User was created!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .catch((error) => {
                    this.sbAlert.open(error, 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
            // console.log(`${newUser.email}, ${newUser.password}, ${newUser.admin}`);
            this.newUserForm.reset();

        }
    }


}
