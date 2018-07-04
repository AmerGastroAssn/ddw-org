import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
    loginForm: FormGroup;
    user: User;
    email: string;
    password: string;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
        authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.router.navigate(['/admin/users']);
            }
        });
    }

    // For Form Validations
    get f() {
        return this.loginForm.controls;
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8)
            ])]
        });

        this.email = this.loginForm.value.email;
        this.password = this.loginForm.value.password;
    }

    onLogin(formData: FormGroup) {
        if (this.loginForm.valid) {
            this.authService.login(formData);
            this.loginForm.reset();
        }
    }

}
