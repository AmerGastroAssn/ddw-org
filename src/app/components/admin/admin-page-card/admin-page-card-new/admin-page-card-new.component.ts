import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Card } from '../../../../models/Card';
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
    // Image upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
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
        isExtURL: this.isExtURL,
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
    ) {
    }

    // For Form Validations
    get f() {
        return this.newPageCardForm.controls;
    }

    uploadImage(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        // The file's download URL
        this.task.snapshotChanges().pipe(
          finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
          })
        )
            .subscribe();
    }


    ngOnInit() {
        // Card1 Form:
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
            isExtURL: [this.isExtURL],
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
        this.pageCardService.setPageCard(formData);
        this.newPageCardForm.reset();
    }


}
