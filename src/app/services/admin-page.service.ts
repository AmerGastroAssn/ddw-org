import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class AdminPageService {
    pageCollection: AngularFirestoreCollection<Page>;
    pageDoc: AngularFirestoreDocument<Page>;
    page: Observable<Page>;


    string_to_slug = (str) => {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
        const to = 'aaaaeeeeiiiioooouuuunc------';
        for (let i = 0, l = from.length; i < l; i += 1) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
                 .replace(/\s+/g, '-') // collapse whitespace and replace by -
                 .replace(/-+/g, '-'); // collapse dashes

        return str;
    }


    constructor(
      private readonly afs: AngularFirestore,
      private readonly router: Router,
    ) {
    }

    getAllRegisterPages(): Observable<Page[]> {
        return this.afs.collection<Page>('pages').valueChanges();
    }

    getPages(): Observable<Page[]> {
        // Ref, and order by title
        this.pageCollection = this.afs.collection(`pages`,
          ref => ref.orderBy('url', 'asc')
        );
        // Gets array of pages along with their uid.
        return this.pageCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as Page;
                           data.$key = a.payload.doc.id;
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
                console.log('data in getPage()', data);
                return data;
            }
        });

        return this.page;
    }

    setPage(formData) {
        const new$key = this.afs.createId();
        const newURL: string = this.string_to_slug(formData.title);
        const timestampToNum = formData.date.getTime();
        // Creates new page with slug as the $key
        const pageRef: AngularFirestoreDocument<Page> = this.afs.doc(`pages/${newURL}`);
        const data: Page = {
            $key: new$key,
            uid: new$key,
            title: formData.title,
            body: formData.body,
            author: formData.author,
            date: timestampToNum,
            photoURL: formData.photoURL,
            bannerPhotoURL: formData.bannerPhotoURL,
            category: formData.category,
            published: formData.published,
            template: formData.template,
            url: newURL,
            extURL: formData.extURL,
            isExtURL: formData.isExtURL,
            sortOrder: formData.sortOrder
        };

        return pageRef.set(data)
                      .then((page) => this.router.navigate(['/admin/pages']))
                      .catch((error) => console.log(`ERROR~aP: `, error));
    }


    updatePage(formData, url: string) {
        // const newURL: string = this.string_to_slug(formData.title);
        const pageRef: AngularFirestoreDocument<Page> = this.afs.doc(`pages/${url}`);
        if (typeof formData.date === 'number') {
            const timestampToNum = formData.date;
            const data: Page = {
                $key: url,
                uid: url,
                title: formData.title,
                body: formData.body,
                author: formData.author,
                date: timestampToNum,
                photoURL: formData.photoURL,
                bannerPhotoURL: formData.bannerPhotoURL,
                category: formData.category,
                published: formData.published,
                template: formData.template,
                url: url,
                extURL: formData.extURL,
                isExtURL: formData.isExtURL,
                sortOrder: formData.sortOrder
            };
            return pageRef.update(data)
                          .then(() => this.router.navigate(['/admin/pages']))
                          .catch((error) => console.log(`ERROR~aP: `, error));
        } else {
            const timestampToNum = formData.date.getTime();
            const data: Page = {
                $key: url,
                uid: url,
                title: formData.title,
                body: formData.body,
                author: formData.author,
                date: timestampToNum,
                photoURL: formData.photoURL,
                bannerPhotoURL: formData.bannerPhotoURL,
                category: formData.category,
                published: formData.published,
                template: formData.template,
                url: url,
                extURL: formData.extURL,
                isExtURL: formData.isExtURL,
                sortOrder: formData.sortOrder
            };
            return pageRef.update(data)
                          .then(() => this.router.navigate(['/admin/pages']))
                          .catch((error) => console.log(`ERROR~aP: `, error));
        }
    }

    updatePage2(updatedPage, id: string): void {
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
