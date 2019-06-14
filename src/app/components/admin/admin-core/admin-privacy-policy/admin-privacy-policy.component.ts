import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { PrivacyPolicy } from '../../../../models/PrivacyPolicy';
import { User } from '../../../../models/User';
import { AdminPrivacyPolicyService } from '../../../../services/admin-privacy-policy.service';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

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
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;


    constructor(
      private privacyPolicyService: AdminPrivacyPolicyService,
      private fb: FormBuilder,
      private sbAlert: MatSnackBar,
      private authService: AuthService,
    ) {
        this.mceApiKey = environment.mceApiKey;
        this.mceConfig = {
            height: 700,
            plugins: 'code, codesample, lists, tinymcespellchecker, link, preview, fullscreen, advcode',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'SASS', value: 'sass' },
                { text: 'SCSS', value: 'scss' },
                { text: 'TypeScript', value: 'typescript' },
            ],
            // tslint:disable-next-line:max-line-length
            toolbar: 'undo redo fontsizeselect styleselect bold italic link unlink openLink forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent fullscreen code preview',
            body_id: 'tiny-mce-textarea',
            // tslint:disable-next-line:max-line-length
            content_style: `body{font-family:'Open Sans',Roboto,'Helvetica Neue',sans-serif!important;line-height:2rem!important;font-size:1.1rem!important}a,a:link{color:#2e6da4}a.btn.btn-warning.btn-lg{background-color:#f47700;color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:700;text-decoration:none;padding:.5em 2em;font-size:18px}a.btn.btn-warning.btn-lg:hover{background-color:#feb512;color:#004060;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:400;text-decoration:none;padding:.5em 2em;font-size:18px}h1,h2,h3{font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:600}
                `,
            content_css: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
        };

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
