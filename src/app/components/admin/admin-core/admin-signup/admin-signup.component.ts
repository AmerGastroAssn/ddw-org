import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-signup',
    templateUrl: './admin-signup.component.html',
    styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
    signupForm: FormGroup;
    user: User;
    email: string;
    password: string;
    title: string;
    displayName: string;
    photoURL: string;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
    }

    // For Form Validations
    get f() {
        return this.signupForm.controls;
    }

    ngOnInit() {
        this.signupForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])],
            title: ['', Validators.required],
            displayName: [''],
            photoURL: ['https://s3.amazonaws.com/DDW/ddw-org/images/avatar_transparent.png']
        });

        this.email = this.signupForm.value.email;
        this.password = this.signupForm.value.password;
        this.title = this.signupForm.value.title;
        this.displayName = this.signupForm.value.displayName;
        this.photoURL = this.signupForm.value.photoURL;
    }

    onSignup(formData: FormGroup) {
        if (this.signupForm.valid) {
            this.authService.signup(formData);
            this.signupForm.reset();
        }
    }

}
