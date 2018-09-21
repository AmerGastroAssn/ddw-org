import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { PressRelease } from '../models/PressRelease';

@Injectable({
    providedIn: 'root'
})
export class AdminPressReleaseService {
    pressReleaseCollection: AngularFirestoreCollection<PressRelease>;
    pressReleaseDoc: AngularFirestoreDocument<PressRelease>;
    pressRelease: Observable<PressRelease>;
    pressReleases$: Observable<PressRelease[]>;
    currentTime: number;


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
        this.currentTime = Date.now();
    }

    getAllPressReleases(): Observable<PressRelease[]> {
        return this.afs.collection<PressRelease>('pressReleases').valueChanges();
    }

    getPressReleases(): Observable<PressRelease[]> {
        // Ref, and order by title
        this.pressReleaseCollection = this.afs.collection(`pressReleases`,
          ref => ref.orderBy('title', 'asc')
        );
        // Gets array of pressReleases along with their uid.
        return this.pressReleaseCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as PressRelease;
                           data.$key = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getPressRelease(id: string): Observable<PressRelease> {
        this.pressReleaseDoc = this.afs.doc<PressRelease>(`pressReleases/${id}`);
        this.pressRelease = this.pressReleaseDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as PressRelease;
                data.uid = action.payload.id;
                console.log('data in getPressRelease()', data);
                return data;
            }
        });

        return this.pressRelease;
    }

    setPressRelease(formData) {
        const pubOnStampToNum = formData.publishOn.getTime();
        const newURL: string = this.string_to_slug(formData.title);
        const currentTime = Date.now();
        // Creates new pressRelease with slug as the $key
        const pressReleaseRef: AngularFirestoreDocument<PressRelease> = this.afs.doc(`pressReleases/${newURL}`);
        const data: PressRelease = {
            $key: newURL,
            author: formData.author,
            createdAt: currentTime,
            body: formData.body,
            sortOrder: formData.sortOrder,
            published: formData.published,
            publishOn: pubOnStampToNum,
            summary: formData.summary,
            title: formData.title,
            uid: newURL,
            url: newURL,
            metaDesc: formData.metaDesc,
        };

        return pressReleaseRef.set(data)
                              .then((pressRelease) => this.router.navigate(['/admin/press-releases']))
                              .catch((error) => console.log(`ERROR~aP: `, error));
    }


    updatePressRelease(formData, url: string) {
        const pressReleaseRef: AngularFirestoreDocument<PressRelease> = this.afs.doc(`pressReleases/${url}`);

        if (typeof formData.publishOn === 'number') {
            const data: PressRelease = {
                $key: url,
                author: formData.author,
                createdAt: this.currentTime,
                body: formData.body,
                sortOrder: formData.sortOrder,
                published: formData.published,
                publishOn: formData.publishOn,
                summary: formData.summary,
                title: formData.title,
                metaDesc: formData.metaDesc,
                uid: url,
                url: url,
            };
            return pressReleaseRef.set(data, { merge: true })
                                  .then(() => this.router.navigate(['/admin/press-releases']))
                                  .catch((error) => console.log(`ERROR~uPR: `, error));
        } else {
            const pubOnStampToNum = formData.publishOn.getTime();
            const data: PressRelease = {
                $key: url,
                author: formData.author,
                createdAt: this.currentTime,
                body: formData.body,
                sortOrder: formData.sortOrder,
                published: formData.published,
                publishOn: pubOnStampToNum,
                summary: formData.summary,
                title: formData.title,
                metaDesc: formData.metaDesc,
                uid: url,
                url: url,
            };
            return pressReleaseRef.set(data, { merge: true })
                                  .then(() => this.router.navigate(['/admin/press-releases']))
                                  .catch((error) => console.log(`ERROR~uPR: `, error));
        }

    }


    deletePressRelease(id: string): void {
        this.pressReleaseDoc = this.afs.doc<PressRelease>(`pressReleases/${id}`);
        if (confirm(`Are you sure you want to delete this pressRelease? This is irreversible.`)) {
            this.pressReleaseDoc.delete()
                .then((pressRelease) => this.router.navigate([`/admin/press-releases`]))
                .catch((error) => console.log(`ERROR~dPR: `, error));
        }
    }

    getAllRegisterPressReleases(): Observable<PressRelease[]> {
        this.pressReleaseCollection = this.afs.collection('pressReleases', ref => {
            return ref.where('category', '==', 'register');
        });
        return this.pressReleases$ = this.pressReleaseCollection.valueChanges();
    }


}
