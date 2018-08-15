import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/Meta';

@Injectable({
    providedIn: 'root'
})
export class AdminMetaService {
    metaCollection: AngularFirestoreCollection<Meta>;
    metaDoc: AngularFirestoreDocument<Meta>;
    meta: Observable<Meta>;
    metas: Observable<Meta[]>;
    $key: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.$key = 'UJYRE64jy6mFVeay7mHL';
    }

    getAllMeta(): Observable<Meta[]> {
        this.metaCollection = this.afs.collection<Meta>('meta');
        return this.metas = this.metaCollection.valueChanges();
    }

    getMeta(): Observable<Meta> {
        this.metaDoc = this.afs.doc<Meta>(`meta/${this.$key}`);
        this.meta = this.metaDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Meta;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.meta;
    }

    updateMeta(updatedMeta): void {
        this.metaDoc = this.afs.doc<Meta>(`meta/${this.$key}`);

        this.metaDoc.update(updatedMeta)
            .then(() => {
                this.sbAlert.open('Meta was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Meta updated', updatedMeta);
            })
            .catch((error) => {
                this.sbAlert.open('Meta was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
