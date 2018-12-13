import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { TextSectionService } from '../../../services/text-section.service';

@Component({
    selector: 'ddw-text-section-new',
    templateUrl: './text-section-new.component.html',
    styleUrls: ['./text-section-new.component.css']
})
export class TextSectionNewComponent implements OnInit {
    newTextSectionForm: FormGroup;
    body: string;
    name: string;
    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
        extraPlugins: 'codesnippet',
        codeSnippet_theme: 'monokai_sublime',
    };

    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private textSectionService: TextSectionService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
    ) {

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
        });

        this.body = this.newTextSectionForm.value.body;
        this.name = this.newTextSectionForm.value.name;
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
