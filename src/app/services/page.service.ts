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

    getPage(id: string): Observable<Page> {
        this.pageDoc = this.afs.doc<Page>(`pages/${id}`);
        this.page$ = this.pageDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Page;
                data.uid = action.payload.id;
                console.log('data in getPage()', data);
                return data;
            }
        });

        return this.page$;
    }

    getRegisterPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'register')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();

    }


    getAttendeePlanningPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'attendee-planning')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getEducationPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'education')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getExhibitorInfoPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'exhibitor-information')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getNewsAndMediaPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'news-and-media')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getPresenterPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'presenters')
                      .where('published', '==', true);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }


}
