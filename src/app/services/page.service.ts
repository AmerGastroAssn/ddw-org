import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    pagesCollection: AngularFirestoreCollection<Page>;
    pages$: Observable<Page[]>;
    pageDoc: AngularFirestoreDocument<Page>;
    page$: Observable<Page>;

    constructor(private afs: AngularFirestore) {
    }

    getRegisterPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'register');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getAttendeePlanningPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'attendee-planning');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getEducationPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'education');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getExhibitorInfoPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'exhibitor-information');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getNewsAndMediaPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'news-and-media');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getPresenterPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'attendee-planning');
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }




    // getRegisterPage(id): Observable<Page> {
    //     this.pageDoc = this.afs.doc(`pages/${id}`);
    //     return this.page$ = this.pageDoc.valueChanges();
    // }


}
