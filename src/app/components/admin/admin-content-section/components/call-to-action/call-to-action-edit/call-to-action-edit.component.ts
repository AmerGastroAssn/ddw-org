import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { AdminImageService } from '../../../../../../services/admin-image.service';
import { AuthService } from '../../../../../../services/auth.service';
import { CallToAction } from '../../../models/call-to-action';
import { CallToActionService } from '../../../services/call-to-action.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'ddw-call-to-action-edit',
    templateUrl: './call-to-action-edit.component.html',
    styleUrls: ['./call-to-action-edit.component.css']
})
export class CallToActionEditComponent implements OnInit {
    editCTAForm: FormGroup;
    cta: CallToAction;
    body: string;
    buttonUrl: string;
    buttonText: string;
    createdAt: string;
    id: string;
    imageUrl: string;
    isExtUrl: boolean;
    name: string;
    published: boolean;
    subtitle: string;
    title: string;
    value: string;
    videoUrl: string;
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
        this.id = this.route.snapshot.params['id'];
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
    }


    // For Form Validations
    get f() {
        return this.editCTAForm.controls;
    }


    ngOnInit() {
        this.ctaService.getCta(this.id).subscribe((cta) => {
            this.cta = cta;
            if (this.cta !== null) {
                this.editCTAForm = this.fb.group({
                    body: [this.cta.body,
                           Validators.compose([
                               Validators.required,
                               Validators.minLength(10),
                               Validators.maxLength(550)
                           ])
                    ],
                    buttonUrl: [this.cta.buttonUrl || ''],
                    buttonText: [this.cta.buttonText || ''],
                    createdAt: [this.cta.createdAt],
                    id: [this.cta.id],
                    imageUrl: [this.cta.imageUrl || ''],
                    isExtUrl: [this.cta.isExtUrl || false],
                    name: [this.cta.name, Validators.required],
                    published: [this.cta.published || false],
                    subtitle: [this.cta.subtitle || ''],
                    title: [this.cta.title || ''],
                    value: [this.cta.value],
                    videoUrl: [this.cta.videoUrl || ''],
                });


                this.body = this.editCTAForm.value.body;
                this.buttonUrl = this.editCTAForm.value.buttonUrl;
                this.buttonText = this.editCTAForm.value.buttonText;
                this.id = this.editCTAForm.value.id;
                this.imageUrl = this.editCTAForm.value.imageUrl;
                this.isExtUrl = this.editCTAForm.value.isExtUrl;
                this.name = this.editCTAForm.value.name;
                this.published = this.editCTAForm.value.published;
                this.subtitle = this.editCTAForm.value.subtitle;
                this.title = this.editCTAForm.value.title;
                this.value = this.editCTAForm.value.value;
                this.videoUrl = this.editCTAForm.value.videoUrl;
            }
        });


    }

    onCreateCTA(formData: FormGroup) {
        if (!this.editCTAForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.ctaService.updateCTA(formData)
                .then(() => console.log('valid CTA Form'))
                .catch((error) => console.log(error));
        }

    }

}
