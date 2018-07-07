import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    pageCollection: AngularFirestoreCollection<Page>;

    constructor(
      private readonly afs: AngularFirestore,
      private readonly router: Router
    ) {
    }

    getAllRegisterPages(): Observable<Page[]> {
        return this.afs.collection<Page>('pages').valueChanges();
    }

    getPages(): Observable<Page[]> {
        // Ref, and order by title
        this.pageCollection = this.afs.collection(`pages`,
          ref => ref.orderBy('title', 'asc')
        );
        // Gets array of users along with their uid.
        return this.pageCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as Page;
                           data.uid = a.payload.doc.id;
                           return data;
                       });
                   });
    }

}
