import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { TextSectionService } from '../../../services/text-section.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'ddw-text-section-new',
    templateUrl: './text-section-new.component.html',
    styleUrls: ['./text-section-new.component.css']
})
export class TextSectionNewComponent implements OnInit {
    newTextSectionForm: FormGroup;
    name: string;
    published: boolean;
// Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;

    body = `<h1>##H1 Header</h1> <h2>##H2 Header</h2> <h3>##H3 Header</h3>  <p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p><p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> <ol><li>Item One</li><li>Item Two</li><li>Item Three</li></ol><h1>##H1 Header</h1> <h2>##H2 Header</h2> <h3>##H3 Header</h3> <p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p><p>##This is some body Paragraph Copy Please remember to delete the pound signs before saving.</p> <ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul> <ol><li>Item One</li><li>Item Two</li><li>Item Three</li></ol>`;

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private textSectionService: TextSectionService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
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

    }


    // For Form Validations
    get f() {
        return this.newTextSectionForm.controls;
    }


    ngOnInit() {
        this.newTextSectionForm = this.fb.group({
            body: [this.body,
                   Validators.compose([
                       Validators.required,
                       Validators.minLength(10)
                   ])
            ],
            name: [this.name, Validators.required],
            published: [this.published || false]
        });

        this.body = this.newTextSectionForm.value.body;
        this.name = this.newTextSectionForm.value.name;
        this.published = this.newTextSectionForm.value.published;
    }

    onCreateTextSection(formData: FormGroup) {
        if (!this.newTextSectionForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
        } else {
            this.textSectionService.setTextSection(formData)
                .then(() => console.log('valid Text Section Form'))
                .catch((error) => {
                    console.log(error);
                    this.sbAlert.open('Something went wrong. Please copy the text from the body and try refreshing the page.', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                });
        }
    }
}
