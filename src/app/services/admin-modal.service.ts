import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Modal } from '../models/Modal';


@Injectable({
    providedIn: 'root'
})
export class AdminModalService {
    modalDoc: AngularFirestoreDocument<Modal>;
    modal: Observable<Modal>;
    $key: string;

    constructor(
      private afs: AngularFirestore,
      public sbAlert: MatSnackBar,
    ) {
        this.$key = 'MamJbx8J2Sgw0VuyL3vs';
    }

    getModal(): Observable<Modal> {
        this.modalDoc = this.afs.doc<Modal>(`modal/${this.$key}`);
        this.modal = this.modalDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Modal;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.modal;
    }

    updateModal(updatedModal): void {
        this.modalDoc = this.afs.doc<Modal>(`modal/${this.$key}`);

        this.modalDoc.update(updatedModal)
            .then(() => {
                this.sbAlert.open('Alert Modal Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Alert Modal updated', updatedModal);
            })
            .catch((error) => {
                this.sbAlert.open('Alert Modal NOT Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
