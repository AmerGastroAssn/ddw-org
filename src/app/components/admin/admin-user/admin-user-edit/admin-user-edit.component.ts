import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';

@Component({
    selector: 'ddw-admin-user-edit',
    templateUrl: './admin-user-edit.component.html',
    styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {
    user: User;
    editUserForm: FormGroup;
    email: string;
    password: string;
    isOnline: boolean;
    loginDate: number = Date.now();
    photoURL: string;
    admin: boolean;
    displayName: string;
    title: string;
    uid: string;
    disableAdminOnEdit: boolean;
    isAdmin: boolean;

    constructor(
      private adminUserService: AdminUserService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private afAuth: AngularFireAuth,
      private sbAlert: MatSnackBar,
    ) {
    }

    // For Form Validations
    get f() {
        return this.editUserForm.controls;
    }

    ngOnInit() {
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get User
        this.adminUserService.getUser(this.uid).subscribe((user) => {
            if (user !== null) {
                this.user = user;

                // Form:
                this.editUserForm = this.fb.group({
                    email: [this.user.email,
                            Validators.compose([
                                Validators.required, Validators.email
                            ])
                    ],
                    password: [this.user.password,
                               Validators.compose([
                                   Validators.required, Validators.minLength(8)
                               ])
                    ],
                    displayName: [this.user.displayName, Validators.required],
                    isOnline: [this.user.isOnline],
                    loginDate: [Date.now()],
                    photoURL: [this.user.photoURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
                    admin: [{ value: this.user.admin, disabled: this.disableAdminOnEdit }],
                    title: [this.user.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                });

                this.email = this.editUserForm.value.email;
                this.password = this.editUserForm.value.password;
                this.displayName = this.editUserForm.value.displayName;
                this.isOnline = this.editUserForm.value.isOnline;
                this.loginDate = this.editUserForm.value.loginDate;
                this.photoURL = this.editUserForm.value.photoURL;
                this.admin = this.editUserForm.value.admin;
                this.title = this.editUserForm.value.title;
            }
        });

        // Is Admin?
        this.adminUserService.getUsersInfo()
            .subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                    if (this.afAuth.auth.currentUser.email === userInfo.email) {
                        if (userInfo.admin === true) {
                            this.isAdmin = true;
                        } else {
                            this.isAdmin = false;
                        }
                    }
                });
            });
    }

    onUpdateUser(formData) {
        if (!this.editUserForm.valid) {
            this.sbAlert.open('Something went wrong, user was not updated', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.adminUserService.updateUser(formData, this.user.uid);
            this.editUserForm.reset();
        }
    }

    onDeleteUser() {
        this.adminUserService.deleteUser(this.uid);
    }

}
