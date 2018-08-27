import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { PressRelease } from '../models/PressRelease';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    pagesCollection: AngularFirestoreCollection<Page>;
    pages$: Observable<Page[]>;
    pageDoc: AngularFirestoreDocument<Page>;
    page$: Observable<Page>;
    currentTime: Date;
    timeToNum: number;
    pressReleases$: Observable<PressRelease[]>;
    pressReleaseCollection: AngularFirestoreCollection<PressRelease>;

    constructor(private afs: AngularFirestore) {
        this.currentTime = new Date();
        this.timeToNum = this.currentTime.getTime();
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
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }


    getAttendeePlanningPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'attendee-planning')
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getEducationPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'education')
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getExhibitorInfoPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'exhibitor-information')
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getNewsAndMediaPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'news')
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }

    getPresenterPages(): Observable<Page[]> {
        this.pagesCollection = this.afs.collection('pages', ref => {
            return ref.where('category', '==', 'presenters')
                      .where('published', '==', true)
                      .where('date', '<=', this.timeToNum);
        });
        return this.pages$ = this.pagesCollection.valueChanges();
    }


    getPublishedPressReleases(): Observable<PressRelease[]> {
        const currentDate = Date.now();
        this.pressReleaseCollection = this.afs.collection<PressRelease>('pressReleases', (ref) => {
            return ref.where('published', '==', true)
                      .where('publishOn', '<=', currentDate);
        });
        return this.pressReleases$ = this.pressReleaseCollection.valueChanges();
    }


}
