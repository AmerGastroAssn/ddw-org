import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { UserService } from '../../../../services/user.service';

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


    constructor(
      private userService: UserService,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
    ) {

    }

    // For Form Validations
    get f() {
        return this.newUserForm.controls;
    }

    ngOnInit() {
        this.newUserForm = this.fb.group({
            email: ['', Validators.required],
            password: ['',
                       Validators.compose([
                           Validators.required, Validators.minLength(8)
                       ])
            ],
            displayName: ['', Validators.required],
            isOnline: [false],
            loginDate: [Date.now()],
            photoURL: ['https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png'],
            admin: [false],
            title: ['',
                    Validators.compose([
                        Validators.required, Validators.minLength(5)
                    ])
            ],
        });

        this.email = this.newUserForm.value.email;
        this.password = this.newUserForm.value.password;
        this.displayName = this.newUserForm.value.displayName;
        this.isOnline = this.newUserForm.value.isOnline;
        this.loginDate = this.newUserForm.value.loginDate;
        this.photoURL = this.newUserForm.value.photoURL;
        this.admin = this.newUserForm.value.admin;
        this.title = this.newUserForm.value.title;
    }

    onAddNewUser(formData) {
        if (!this.newUserForm.valid) {
            this.flashMessage.show('Something went wrong, User was not created.',
              {
                  cssClass: 'alert-danger',
                  timeout: 3500
              });
        } else {
            this.userService.addUser(formData);
            // console.log(`${newUser.email}, ${newUser.password}, ${newUser.admin}`);
            this.newUserForm.reset();
            this.flashMessage.show(`${formData.displayName} was created successfully!`,
              {
                  cssClass: 'alert-success',
                  timeout: 3500
              });
        }
    }

}
