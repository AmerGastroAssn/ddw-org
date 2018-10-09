import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Card } from '../../../../models/Card';
import { AdminImageService } from '../../../../services/admin-image.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { PagesCardService } from '../../../../services/pages-card.service';

@Component({
    selector: 'ddw-admin-page-card-new',
    templateUrl: './admin-page-card-new.component.html',
    styleUrls: ['./admin-page-card-new.component.css']
})
export class AdminPageCardNewComponent implements OnInit {
    newPageCardForm: FormGroup;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;
    author: string;
    updatedAt: any;
    isExtURL: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;

    card: Card = {
        $key: this.$key,
        uid: this.uid,
        orderNumber: this.orderNumber,
        title: this.title,
        body: this.body,
        photoURL: this.photoURL,
        buttonString: this.buttonString,
        url: this.url,
        updatedAt: Date.now(),
        author: this.pageCardService.loggedInUser,
        isExtURL: this.isExtURL || false,
    };

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private pageCardService: PagesCardService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private imageService: AdminImageService,
    ) {
    }

    // For Form Validations
    get f() {
        return this.newPageCardForm.controls;
    }


    ngOnInit() {
        this.newPageCardForm = this.fb.group({
            orderNumber: [this.orderNumber || ''],
            title: [this.title,
                    Validators.compose([
                        Validators.required, Validators.minLength(3)
                    ])
            ],
            body: [this.body,
                   Validators.compose([
                       Validators.required, Validators.minLength(10)
                   ])
            ],
            photoURL: [this.photoURL, Validators.required],
            buttonString: [this.buttonString, Validators.required],
            url: [this.url],
            isExtURL: [this.isExtURL || false],
        });

        this.orderNumber = this.newPageCardForm.value.orderNumber;
        this.title = this.newPageCardForm.value.title;
        this.body = this.newPageCardForm.value.body;
        this.photoURL = this.newPageCardForm.value.photoURL;
        this.buttonString = this.newPageCardForm.value.buttonString;
        this.url = this.newPageCardForm.value.url;
        this.isExtURL = this.newPageCardForm.value.isExtURL;

    }

    onCreateCard(formData: FormGroup) {
        console.log('formDataCard', formData);
        this.pageCardService.setPageCard(formData);
        this.newPageCardForm.reset();
    }


}
