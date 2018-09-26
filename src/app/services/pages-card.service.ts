import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Card } from '../models/Card';

@Injectable({
    providedIn: 'root'
})
export class PagesCardService {
    pageCardCollection: AngularFirestoreCollection<Card>;
    pageCardDoc: AngularFirestoreDocument<Card>;
    pageCard$: Observable<Card>;
    pageCards$: Observable<Card[]>;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      public sbAlert: MatSnackBar,
    ) {
    }

    getAllPageCards(): Observable<Card[]> {
        this.pageCardCollection = this.afs.collection<Card>('pageCards');
        return this.pageCardCollection.valueChanges();
    }

    getPageCardByTitle(title: string): Observable<Card[]> {
        this.pageCardCollection = this.afs.collection<Card>('pageCards', ref => {
            return ref.where('title', '==', `${title}`);
        });
        return this.pageCards$ = this.pageCardCollection.valueChanges();
    }

    getPageCard(key: string): Observable<Card> {
        this.pageCardDoc = this.afs.doc<Card>(`pageCards/${key}`);
        this.pageCard$ = this.pageCardDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Card;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.pageCard$;
    }


    updatePageCard(formData, id): object {
        const cardRef: AngularFirestoreDocument<Card> = this.afs.doc(`pageCards/${id}`);

        const data: Card = {
            $key: id,
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            uid: id,
        };

        console.log('data', data);
        return cardRef.set(data, { merge: true })
                      .then(() => {
                          this.router.navigate(['/admin/page-cards']);
                          this.sbAlert.open('Page Card Updated!', 'Dismiss', {
                              duration: 3000,
                              verticalPosition: 'bottom',
                              panelClass: ['snackbar-success']
                          });
                          console.log('Page Card Updated', data);
                      })
                      .catch((error) => console.log(`ERROR~uPC: `, error));
    }

    setPageCard(formData): object {
        const new$key = this.afs.createId();
        const calRef: AngularFirestoreDocument<Card> = this.afs.doc(`pageCards/${new$key}`);

        const data: Card = {
            $key: new$key,
            orderNumber: formData.orderNumber,
            title: formData.title,
            body: formData.body,
            photoURL: formData.photoURL,
            buttonString: formData.buttonString,
            url: formData.url,
            uid: new$key,
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/admin/page-cards']);
                         this.sbAlert.open('Page Card Created!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Page Card Created!', data);
                     })
                     .catch((error) => console.log(`ERROR~sPC: `, error));
    }


}
