import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { ContactForm } from '../models/ContactForm';

@Injectable({
    providedIn: 'root'
})
export class ContactFormService {
    contactFormCollection: AngularFirestoreCollection<ContactForm>;
    contactFormDoc: AngularFirestoreDocument<ContactForm>;
    contactForm: Observable<ContactForm>;
    contactForms$: Observable<ContactForm[]>;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      public sbAlert: MatSnackBar,
    ) {
    }

    getAllContactForms(sortValue): Observable<ContactForm[]> {
        // Ref, and order by title
        console.log('sortValue', sortValue);
        this.contactFormCollection = this.afs.collection(`contactForm`,
          ref => ref.orderBy(sortValue, 'asc')
        );
        // Gets array of pressReleases along with their uid.
        return this.contactFormCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as ContactForm;
                           data.$key = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getAllUnviewedContacts(): Observable<ContactForm[]> {
        this.contactFormCollection = this.afs.collection(`contactForm`,
          ref => ref.where('viewed', '==', false)
        );
        // Gets array of pressReleases along with their uid.
        return this.contactFormCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as ContactForm;
                           data.$key = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getContact(id: string): Observable<ContactForm> {
        this.contactFormDoc = this.afs.doc<ContactForm>(`contactForm/${id}`);
        this.contactForm = this.contactFormDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as ContactForm;
                data.uid = action.payload.id;
                console.log('data in getContact', data);
                return data;
            }
        });

        return this.contactForm;
    }


    setContactForm(formData) {
        // Creates new pressRelease with slug as the $key
        const new$key = this.afs.createId();
        const contactFormRef: AngularFirestoreDocument<ContactForm> = this.afs.doc(`contactForm/${new$key}`);

        const data: ContactForm = {
            $key: new$key,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            subject: formData.subject,
            body: formData.body,
            sentDate: Date.now(),
            viewed: formData.viewed || false,
            uid: new$key,
        };

        return contactFormRef.set(data);
    }

    deleteContact(id: string): void {
        this.contactFormDoc = this.afs.doc<ContactForm>(`contactForm/${id}`);
        if (confirm(`Are you sure you want to delete this Contact? This is irreversible.`)) {
            this.contactFormDoc.delete()
                .then(() => {
                    this.sbAlert.open('Contact Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                    this.router.navigate([`/admin/contacts`]);
                })
                .catch((error) => {
                    this.sbAlert.open('Something went wrong, Contact not Deleted', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-danger']
                    });
                    console.log(`ERROR~dC: `, error);
                });
        }
    }

    setViewedContact(id) {
        this.afs.doc(`contactForm/${id}`).set({
            viewed: true
        }, { merge: true })
            .then(() => {
                this.sbAlert.open('Contact marked as Viewed', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                this.sbAlert.open('Something went wrong, Contact not updated', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log('Error~sVC:', error);
            });
    }

    setUnviewedContact(id) {
        this.afs.doc(`contactForm/${id}`).set({
            viewed: false
        }, { merge: true })
            .then(() => {
                this.sbAlert.open('Contact Un-viewed', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
            })
            .catch((error) => {
                this.sbAlert.open('Something went wrong, Contact not updated', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log('Error~sVC:', error);
            });
    }
}
