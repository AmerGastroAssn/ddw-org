import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PrivacyPolicy } from '../../../../models/PrivacyPolicy';
import { User } from '../../../../models/User';
import { AdminPrivacyPolicyService } from '../../../../services/admin-privacy-policy.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-privacy-policy',
    templateUrl: './admin-privacy-policy.component.html',
    styleUrls: ['./admin-privacy-policy.component.css']
})
export class AdminPrivacyPolicyComponent implements OnInit {
    privacyPolicyForm: FormGroup;
    privacyPolicy: PrivacyPolicy;
    $key: string;
    body: string;
    updatedAt: number = Date.now();
    uid: string;
    author: string;
    currentUser: User;

    CkeditorConfig = {
        allowedContent: true,
        height: 700,
        extraAllowedContent: 'div;span;ul;li;table;td;style;*[id,rel];*(*);*{*}',
        extraPlugins: ['codesnippet', 'divarea'],
        codeSnippet_theme: 'monokai_sublime',
    };

    constructor(
      private privacyPolicyService: AdminPrivacyPolicyService,
      private fb: FormBuilder,
      private sbAlert: MatSnackBar,
      private authService: AuthService,
    ) {
        this.updatedAt = Date.now();
        this.currentUser = this.authService.getProfile().email;
    }

    get f() {
        return this.privacyPolicyForm.controls;
    }

    ngOnInit() {
        // Get PrivacyPolicy
        this.privacyPolicyService.getPrivacyPolicy().subscribe((privacyPolicy) => {
            if (privacyPolicy !== null) {
                this.privacyPolicy = privacyPolicy;
                // Form:
                this.privacyPolicyForm = this.fb.group({
                    author: [this.currentUser || ''],
                    $key: [this.privacyPolicyService.$key],
                    body: [this.privacyPolicy.body],
                    updatedAt: [this.updatedAt],
                    uid: [this.privacyPolicy.uid],
                });

                this.author = this.privacyPolicyForm.value.author;
                this.$key = this.privacyPolicyForm.value.$key;
                this.body = this.privacyPolicyForm.value.body;
                this.updatedAt = this.privacyPolicyForm.value.updatedAt;
                this.uid = this.privacyPolicyForm.value.uid;
            }
        });
    }


    onPrivacyPolicySubmit(privacyPolicyData) {
        if (this.privacyPolicyForm.valid) {
            this.privacyPolicyService.updatePrivacyPolicy(privacyPolicyData);
            this.privacyPolicyForm.reset(this.privacyPolicyService.getPrivacyPolicy());
        } else {
            this.sbAlert.open('Privacy Policy not Valid. Refresh and try again.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }
}
