import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

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


    constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
    ) {
    }

    // For Form Validations
    get f() {
        return this.editUserForm.controls;
    }

    ngOnInit() {
        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get User
        this.userService.getUser(this.uid).subscribe((user) => {
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
                    admin: [this.user.admin],
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
    }

    onUpdateUser(formData) {
        if (!this.editUserForm.valid) {
            this.flashMessage.show('Something went wrong, User was not updated.',
              {
                  cssClass: 'alert-danger',
                  timeout: 3500
              });
        } else {
            this.userService.updateUser(formData, this.user.uid);
            // console.log(`${newUser.email}, ${newUser.password}, ${newUser.admin}`);
            this.editUserForm.reset();
            this.flashMessage.show(`${formData.displayName} was updated!`,
              {
                  cssClass: 'alert-success',
                  timeout: 3500
              });
        }
    }

}
