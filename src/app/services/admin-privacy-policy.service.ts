import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { PrivacyPolicy } from '../models/PrivacyPolicy';

@Injectable({
    providedIn: 'root'
})
export class AdminPrivacyPolicyService {
    privacyPolicyDoc: AngularFirestoreDocument<PrivacyPolicy>;
    privacyPolicy: Observable<PrivacyPolicy>;
    $key: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.$key = 'tNHSskSp9M5xVny6xVeM';
    }

    getPrivacyPolicy(): Observable<PrivacyPolicy> {
        this.privacyPolicyDoc = this.afs.doc<PrivacyPolicy>(`privacyPolicy/${this.$key}`);
        this.privacyPolicy = this.privacyPolicyDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as PrivacyPolicy;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.privacyPolicy;
    }

    updatePrivacyPolicy(updatedPrivacyPolicy): void {
        this.privacyPolicyDoc = this.afs.doc<PrivacyPolicy>(`privacyPolicy/${this.$key}`);

        this.privacyPolicyDoc.update(updatedPrivacyPolicy)
            .then(() => {
                this.sbAlert.open('Privacy Policy Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Privacy Policy updated', updatedPrivacyPolicy);
            })
            .catch((error) => {
                this.sbAlert.open('Privacy Policy was NOT Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uPP: `, error);
            });
    }
}
