import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Card } from '../../../../../models/Card';
import { AdminCardService } from '../../../../../services/admin-card.service';
import { AdminImageService } from '../../../../../services/admin-image.service';
import { AdminPageService } from '../../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../../services/admin-settings.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-cards-edit',
    templateUrl: './admin-cards-edit.component.html',
    styleUrls: ['./admin-cards-edit.component.css']
})
export class AdminCardsEditComponent implements OnInit {
    cardForm1: FormGroup;
    cardForm2: FormGroup;
    cardForm3: FormGroup;
    card1: Card;
    card2: Card;
    card3: Card;

    // Card 1
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;
    disableAdminOnNew: boolean;
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
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private cardService: AdminCardService,
      private authService: AuthService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private settingsService: AdminSettingsService,
      private imageService: AdminImageService,
    ) {

    }

    // For Form Validations
    get f1() {
        return this.cardForm1.controls;
    }

    get f2() {
        return this.cardForm2.controls;
    }

    get f3() {
        return this.cardForm3.controls;
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
        const path = `pageImages/${new Date().getTime()}_${file.name.replace(/\s/g, '_')}`;
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
                  this.imageService.setImage(imageURL, file.name.replace(/\s/g, '_'))
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
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;
        // Get Card 1
        this.cardService.getCard1().subscribe((card) => {
            // Card 1

            if (card !== null) {
                this.card1 = card;

                // Card1 Form:
                this.cardForm1 = this.fb.group({
                    $key: [this.card1.$key],
                    uid: [this.card1.uid],
                    orderNumber: [this.card1.orderNumber],
                    title: [this.card1.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.card1.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.card1.photoURL, Validators.required],
                    buttonString: [this.card1.buttonString, Validators.required],
                    url: [this.card1.url, Validators.required],
                });

                this.$key = this.cardForm1.value.$key;
                this.uid = this.cardForm1.value.uid;
                this.orderNumber = this.cardForm1.value.orderNumber;
                this.title = this.cardForm1.value.title;
                this.body = this.cardForm1.value.body;
                this.photoURL = this.cardForm1.value.photoURL;
                this.buttonString = this.cardForm1.value.buttonString;
                this.url = this.cardForm1.value.url;
            }
        });

        // Get Card 2
        this.cardService.getCard2().subscribe((card) => {
            if (card !== null) {
                this.card2 = card;

                // Card1 Form:
                this.cardForm2 = this.fb.group({
                    $key: [this.card2.$key],
                    uid: [this.card2.uid],
                    orderNumber: [this.card2.orderNumber],
                    title: [this.card2.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.card2.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.card2.photoURL, Validators.required],
                    buttonString: [this.card2.buttonString, Validators.required],
                    url: [this.card2.url, Validators.required],
                });

                this.$key = this.cardForm2.value.$key;
                this.uid = this.cardForm2.value.uid;
                this.title = this.cardForm2.value.title;
                this.body = this.cardForm2.value.body;
                this.photoURL = this.cardForm2.value.photoURL;
                this.buttonString = this.cardForm2.value.buttonString;
                this.url = this.cardForm2.value.url;
            }
        });

        // Get Card 3
        this.cardService.getCard3().subscribe((card) => {
            if (card !== null) {
                this.card3 = card;

                // Card1 Form:
                this.cardForm3 = this.fb.group({
                    $key: [this.card3.$key],
                    uid: [this.card3.uid],
                    orderNumber: [this.card3.orderNumber],
                    title: [this.card3.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.card3.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.card3.photoURL, Validators.required],
                    buttonString: [this.card3.buttonString, Validators.required],
                    url: [this.card3.url, Validators.required],
                });

                this.$key = this.cardForm3.value.$key;
                this.uid = this.cardForm3.value.uid;
                this.orderNumber = this.cardForm3.value.orderNumber;
                this.title = this.cardForm3.value.title;
                this.body = this.cardForm3.value.body;
                this.photoURL = this.cardForm3.value.photoURL;
                this.buttonString = this.cardForm3.value.buttonString;
                this.url = this.cardForm3.value.url;
            }
        });


    }

    onUpdateCard1(formData) {
        this.cardService.updateCard1(formData);
        this.cardForm1.reset(this.cardService.getCard1());
    }

    onUpdateCard2(formData) {
        this.cardService.updateCard2(formData);
        this.cardForm2.reset(this.cardService.getCard2());
    }

    onUpdateCard3(formData) {
        this.cardService.updateCard3(formData);
        this.cardForm3.reset(this.cardService.getCard3());
    }

}
