import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-user-new',
    templateUrl: './admin-user-new.component.html',
    styleUrls: ['./admin-user-new.component.css']
})
export class AdminUserNewComponent implements OnInit {
    @ViewChild('newUserForm') newUserForm: NgForm;
    user: User = {
        email: '',
        password: '',
        isOnline: false,
        loginDate: Date.now(),
        photoURL: '',
        admin: false,
        displayName: '',
        title: ''
    };

    constructor(private userService: UserService) {
    }

    ngOnInit() {
    }

    onAddNewUser(form: NgForm) {
        const value = form.value;
        const newUser = new User(
          value.email,
          value.password,
          value.isOnline = false,
          value.loginDate = Date.now(),
          value.photoURL = 'https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png',
          value.admin || false,
          value.displayName,
          value.title
        );
        this.userService.addUser(newUser);
        console.log(`${newUser.email}, ${newUser.password}, ${newUser.admin}`);
        this.newUserForm.reset();


    }

}
