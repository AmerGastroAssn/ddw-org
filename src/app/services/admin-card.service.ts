import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
    providedIn: 'root'
})
export class AdminCardService {
    cardCollection: AngularFirestoreCollection<Card[]>;
    cardDoc: AngularFirestoreDocument<Card>;
    card: Observable<Card>;
    $keyCard1: string;
    $keyCard2: string;
    $keyCard3: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.$keyCard1 = 'yVYC4hemL5cwtFjTgF5M';
        this.$keyCard2 = 'GgE0Lo78rFL7JxyNNkPK';
        this.$keyCard3 = 'RSm22cNL5n1QzRpq0agQ';
    }

    getCard1(): Observable<Card> {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard1}`);
        this.card = this.cardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.card;
    }

    getCard2(): Observable<Card> {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard2}`);
        this.card = this.cardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.card;
    }

    getCard3(): Observable<Card> {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard3}`);
        this.card = this.cardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.card;
    }

    updateCard1(updatedCard): void {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard1}`);

        this.cardDoc.update(updatedCard)
            .then(() => {
                this.sbAlert.open('Card was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Card updated', updatedCard);
            })
            .catch((error) => {
                this.sbAlert.open('Card was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }


    updateCard2(updatedCard): void {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard2}`);

        this.cardDoc.update(updatedCard)
            .then(() => {
                this.sbAlert.open('Card was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Card updated', updatedCard);
            })
            .catch((error) => {
                this.sbAlert.open('Card was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }



    updateCard3(updatedCard): void {
        this.cardDoc = this.afs.doc<Card>(`cards/${this.$keyCard3}`);

        this.cardDoc.update(updatedCard)
            .then(() => {
                this.sbAlert.open('Card was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Card updated', updatedCard);
            })
            .catch((error) => {
                this.sbAlert.open('Card was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
