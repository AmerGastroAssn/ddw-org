import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { TextSection } from '../../../models/text-section';
import { TextSectionService } from '../../../services/text-section.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
    selector: 'ddw-text-section-edit',
    templateUrl: './text-section-edit.component.html',
    styleUrls: ['./text-section-edit.component.css']
})
export class TextSectionEditComponent implements OnInit {
    editTextSectionForm: FormGroup;
    textSection: TextSection;
    body: string;
    createdAt: number;
    id: string;
    name: string;
    published: boolean;
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;


    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private textSectionService: TextSectionService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
    ) {
        this.id = route.snapshot.params['id'];
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
        return this.editTextSectionForm.controls;
    }


    ngOnInit() {
        this.textSectionService.getTextSection(this.id).subscribe((section) => {
            this.textSection = section;
            if (this.textSection !== null) {
                this.editTextSectionForm = this.fb.group({
                    body: [this.textSection.body,
                        Validators.compose([
                            Validators.required,
                            Validators.minLength(10)
                        ])
                    ],
                    createdAt: [this.textSection.createdAt],
                    id: [this.id],
                    name: [this.textSection.name, Validators.required],
                    published: [this.published || false],
                });

                this.body = this.editTextSectionForm.value.body;
                this.createdAt = this.editTextSectionForm.value.createdAt;
                this.id = this.editTextSectionForm.value.id;
                this.name = this.editTextSectionForm.value.name;
                this.published = this.editTextSectionForm.value.published;
            }
        });
    }

    onUpdateTextSection(formData: FormGroup) {
        if (!this.editTextSectionForm.valid) {
            this.sbAlert.open('Form not valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
        } else {
            this.textSectionService.updateTextSection(formData)
              .then(() => console.log('valid Text Section Form'))
              .catch((error) => {
                  console.log(error);
                  this.sbAlert.open('Something went wrong. Please try refreshing the page.', 'Dismiss', {
                      duration: 3000,
                      verticalPosition: 'bottom',
                      panelClass: ['snackbar-danger']
                  });
              });
        }
    }
}
