import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class PageService {
    pageCollection: AngularFirestoreCollection<Page>;
    pageDoc: AngularFirestoreDocument<Page>;
    page: Observable<Page>;

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
        // Gets array of pages along with their uid.
        return this.pageCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as Page;
                           data.uid = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getPage(id: string): Observable<Page> {
        this.pageDoc = this.afs.doc<Page>(`pages/${id}`);
        this.page = this.pageDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Page;
                data.uid = action.payload.id;
                return data;
            }
        });

        return this.page;
    }

    addPage(newPage: Page): void {
        const pagesCollection = this.afs.collection<Page>('pages');
        pagesCollection.add(newPage)
                       .then((page) => this.router.navigate(['/admin/pages']))
                       .catch((error) => console.log(`ERROR~aP: `, error));
    }

    updatePage(updatedPage, id: string): void {
        this.pageDoc = this.afs.doc<Page>(`pages/${id}`);
        this.pageDoc.update(updatedPage)
            .then((page) => this.router.navigate([`/admin/pages/${id}`]))
            .catch((error) => console.log(`ERROR~uP: `, error));
    }

    deletePage(id: string): void {
        this.pageDoc = this.afs.doc<Page>(`pages/${id}`);
        if (confirm(`Are you sure you want to delete this page? This is irreversible.`)) {
            this.pageDoc.delete()
                .then((page) => this.router.navigate([`/admin/pages`]))
                .catch((error) => console.log(`ERROR~dP: `, error));
        }
    }

}
