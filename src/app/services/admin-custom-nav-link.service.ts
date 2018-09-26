import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CustomLink } from '../models/CustomLink';

@Injectable({
    providedIn: 'root'
})
export class AdminCustomNavLinkService {
    customLinkCollection: AngularFirestoreCollection<CustomLink>;
    customLinkDoc: AngularFirestoreDocument<CustomLink>;
    customLinks$: Observable<CustomLink[]>;
    customLink$: Observable<CustomLink>;
    customLink$key: string;

    constructor(
      public sbAlert: MatSnackBar,
      private afs: AngularFirestore,
    ) {
        this.customLink$key = 'DQz8J3vlgvTpUpcR7Qox';
    }

    getCustomLinks(): Observable<CustomLink> {
        this.customLinkDoc = this.afs.doc<CustomLink>(`customLinks/${this.customLink$key}`);
        this.customLink$ = this.customLinkDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as CustomLink;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.customLink$;
    }


    updateCustomLink(updatedCustomLink): void {
        this.customLinkDoc = this.afs.doc<CustomLink>(`customLinks/${this.customLink$key}`);

        this.customLinkDoc.update(updatedCustomLink)
            .then(() => {
                this.sbAlert.open('CustomLinks Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('CustomLink updated', updatedCustomLink);
            })
            .catch((error) => {
                this.sbAlert.open('CustomLinks NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uCL: `, error);
            });
    }
}
