import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Card } from '../../../../models/Card';
import { AdminImageService } from '../../../../services/admin-image.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { PagesCardService } from '../../../../services/pages-card.service';

@Component({
    selector: 'ddw-admin-page-card-edit',
    templateUrl: './admin-page-card-edit.component.html',
    styleUrls: ['./admin-page-card-edit.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class AdminPageCardEditComponent implements OnInit {
    editPageCardForm: FormGroup;
    card: Card;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;
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
        // Get id from url
        this.uid = this.route.snapshot.params['id'];
    }

    // For Form Validations
    get f() {
        return this.editPageCardForm.controls;
    }

    uploadImage(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            this.sbAlert.open('That file type is not supported :(', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name.replace(/\s/g, '_').toLowerCase()}`;
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
              this.downloadURL.subscribe((imageURL) => {
                  this.imageService.setImage(imageURL, file.name.replace(/\s/g, '_').toLowerCase())
                      .then(() => {
                          this.sbAlert.open('Image has been added!', 'Dismiss', {
                              duration: 3000,
                              verticalPosition: 'bottom',
                              panelClass: ['snackbar-success']
                          });
                      })
                      .catch((error) => console.log('Problem sending image to service', error));
              });


          })
        )
            .subscribe();
    }


    ngOnInit() {
        // Card1 Form:
        this.pageCardService.getPageCard(this.uid).subscribe((card) => {
            this.card = card;

            this.editPageCardForm = this.fb.group({
                orderNumber: [this.card.orderNumber || ''],
                title: [this.card.title,
                        Validators.compose([
                            Validators.required, Validators.minLength(3)
                        ])
                ],
                body: [this.card.body,
                       Validators.compose([
                           Validators.required, Validators.minLength(10)
                       ])
                ],
                photoURL: [this.card.photoURL, Validators.required],
                buttonString: [this.card.buttonString, Validators.required],
                url: [this.card.url],
                isExtURL: [this.card.isExtURL || false],
            });

            this.orderNumber = this.editPageCardForm.value.orderNumber;
            this.title = this.editPageCardForm.value.title;
            this.body = this.editPageCardForm.value.body;
            this.photoURL = this.editPageCardForm.value.photoURL;
            this.buttonString = this.editPageCardForm.value.buttonString;
            this.url = this.editPageCardForm.value.url;
            this.isExtURL = this.editPageCardForm.value.isExtURL;
        });

    }

    onUpdatePageCard(formData) {
        this.pageCardService.updatePageCard(formData, this.uid);
        this.editPageCardForm.reset();
    }

    onDeletePageCard(id, title) {
        this.pageCardService.deletePageCard(id, title);
    }
}
