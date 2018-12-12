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
    name: string;
    subtitle: string;
    title: string;
    videoUrl: string;
    currentDate: number = Date.now();
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
      private ctaService: CallToActionService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private imageService: AdminImageService,
      private authService: AuthService,
    ) {
        this.author = this.authService.getProfile();
        this.currentDate = Date.now();
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
                       Validators.minLength(10)
                   ])
            ],
            buttonUrl: [this.buttonUrl || ''],
            buttonText: [this.buttonText || ''],
            imageUrl: [this.imageUrl || ''],
            isExtUrl: [this.isExtUrl || false],
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
        this.subtitle = this.newCTAForm.value.subtitle;
        this.title = this.newCTAForm.value.title;
        this.videoUrl = this.newCTAForm.value.videoUrl;


    }

    onCreateCTA(formData: FormGroup) {
        console.log('formData-CTA', formData);
        this.ctaService.setCTA(formData);
        // this.newCTAForm.reset();
    }
}
