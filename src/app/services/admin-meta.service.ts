import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Meta } from '../models/Meta';

@Injectable({
    providedIn: 'root'
})
export class AdminMetaService {
    metaCollection: AngularFirestoreCollection<Meta[]>;
    metaDoc: AngularFirestoreDocument<Meta>;
    meta: Observable<Meta>;
    $key: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
    ) {
        this.$key = 'UJYRE64jy6mFVeay7mHL';
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
                this.flashMessage.show(`Meta was updated successfully!`, {
                    cssClass: 'alert-success',
                    timeout: 2000
                });
                this.router.navigate(['/admin/settings']);
                console.log('Meta updated', updatedMeta);
            })
            .catch((error) => {
                this.flashMessage.show(`Something went wrong Meta was not updated :(... Error: ${error}`, {
                    cssClass: 'alert-danger',
                    timeout: 5000
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
