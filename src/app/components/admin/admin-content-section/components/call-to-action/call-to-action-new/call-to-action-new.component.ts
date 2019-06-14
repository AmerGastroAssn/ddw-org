import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { User } from '../../../../../../models/User';
import { AdminImageService } from '../../../../../../services/admin-image.service';
import { AuthService } from '../../../../../../services/auth.service';
import { CallToActionService } from '../../../services/call-to-action.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'ddw-call-to-action-new',
    templateUrl: './call-to-action-new.component.html',
    styleUrls: ['./call-to-action-new.component.css']
})
export class CallToActionNewComponent implements OnInit {
    newCTAForm: FormGroup;
    author: User;
    body: string;
    buttonUrl: string;
    buttonText: string;
    imageUrl: string;
    isExtUrl: boolean;
    published: boolean;
    name: string;
    subtitle: string;
    title: string;
    videoUrl: string;
    currentDate: number = Date.now();
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private ctaService: CallToActionService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private imageService: AdminImageService,
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
        this.author = this.authService.getProfile();
        this.currentDate = Date.now();
        this.body = `
                <blockquote>
            ## Quoted text here. The pound signs are styling placeholders, to hold
            the styling. After you add your text, you should remove them. Please only backspace once over each pound-sign to remove. That way it will hold its styled tag. </blockquote>
        
        <p class="quoteby">
            <span> ## Yellow text goes here,</span> ## Non-Yellow text here.
        </p>`;
    }


    // For Form Validations
    get f() {
        return this.newCTAForm.controls;
    }


    ngOnInit() {
        this.newCTAForm = this.fb.group({
            author: [this.author],
            body: [this.body,
                   Validators.compose([
                       Validators.required,
                       Validators.minLength(10),
                       Validators.maxLength(550)
                   ])
            ],
            buttonUrl: [this.buttonUrl || ''],
            buttonText: [this.buttonText || ''],
            imageUrl: [this.imageUrl || ''],
            isExtUrl: [this.isExtUrl || false],
            published: [this.published || false],
            name: [this.name, Validators.required],
            subtitle: [this.subtitle || ''],
            title: [this.title || ''],
            videoUrl: [this.videoUrl || ''],
        });


        this.author = this.newCTAForm.value.author;
        this.body = this.newCTAForm.value.body;
        this.buttonUrl = this.newCTAForm.value.buttonUrl;
        this.buttonText = this.newCTAForm.value.buttonText;
        this.imageUrl = this.newCTAForm.value.imageUrl;
        this.isExtUrl = this.newCTAForm.value.isExtUrl;
        this.name = this.newCTAForm.value.name;
        this.published = this.newCTAForm.value.published;
        this.subtitle = this.newCTAForm.value.subtitle;
        this.title = this.newCTAForm.value.title;
        this.videoUrl = this.newCTAForm.value.videoUrl;


    }

    onCreateCTA(formData: FormGroup) {
        if (!this.newCTAForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.ctaService.setCTA(formData)
                .then(() => console.log('valid CTA Form'))
                .catch((error) => console.log(error));
        }
    }
}
