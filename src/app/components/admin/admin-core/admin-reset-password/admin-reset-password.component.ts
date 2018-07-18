import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-reset-password',
    templateUrl: './admin-reset-password.component.html',
    styleUrls: ['./admin-reset-password.component.css']
})
export class AdminResetPasswordComponent implements OnInit {
    resetForm: FormGroup;
    email: any;


    constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private router: Router
    ) {
    }

    // For Form Validations
    get f() {
        return this.resetForm.controls;
    }

    ngOnInit() {
        this.resetForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.email
            ])],
        });

        this.email = this.resetForm.value.email;
    }

    onSubmit(email: FormGroup) {
        if (this.resetForm.valid) {
            this.authService.resetPassword(email);
            this.resetForm.reset();
        }
    }

}
