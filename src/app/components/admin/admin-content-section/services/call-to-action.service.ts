import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { CallToAction } from '../models/call-to-action';

@Injectable({
    providedIn: 'root'
})
export class CallToActionService {
    ctaCollection: AngularFirestoreCollection<CallToAction>;
    ctaDoc: AngularFirestoreDocument<CallToAction>;
    cta$: Observable<CallToAction>;
    ctas$: Observable<CallToAction[]>;
    currentUser: User;
    currentDate: number = Date.now();

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private sbAlert: MatSnackBar,
      private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
        this.currentDate = Date.now();
    }

    stringToSlug = (str) => {
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

    getAllCtas(): Observable<CallToAction[]> {
        this.ctaCollection = this.afs.collection<CallToAction>('call-to-actions', (ref) => {
            return ref.orderBy('value', 'asc');
        });
        return this.ctaCollection.valueChanges();
    }


    getCtas(): Observable<CallToAction[]> {
        // Ref, and order by title
        this.ctaCollection = this.afs.collection(`call-to-actions`,
          ref => ref.orderBy('value', 'asc')
        );
        // Gets array of ctas along with their uid.
        return this.ctaCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as CallToAction;
                           data.id = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    getCta(id: string): Observable<CallToAction> {
        this.ctaDoc = this.afs.doc<CallToAction>(`call-to-actions/${id}`);
        this.cta$ = this.ctaDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as CallToAction;
                data.id = action.payload.id;
                // console.log('data in getCta()', data);
                return data;
            }
        });

        return this.cta$;
    }


    getSearchedCtas(start, end) {
        return this.afs.collection('call-to-actions',
          (ref) => ref.orderBy('value')
                      .startAt(start).endAt(end)
        )
                   .valueChanges();
    }

    setCTA(formData): Promise<void> {
        const nameToUrl = this.stringToSlug(formData.name);
        const newId = this.afs.createId();
        const ctaRef: AngularFirestoreDocument<CallToAction> = this.afs.doc(`call-to-actions/${newId}`);

        const data: CallToAction = {
            author: this.currentUser,
            body: formData.body,
            buttonUrl: formData.buttonUrl,
            buttonText: formData.buttonText,
            createdAt: this.currentDate,
            id: newId,
            imageUrl: formData.imageUrl,
            isExtUrl: formData.isExtUrl || false,
            name: formData.name,
            published: formData.published || false,
            subtitle: formData.subtitle,
            updatedAt: this.currentDate,
            title: formData.title,
            value: nameToUrl,
            videoUrl: formData.videoUrl,
        };

        console.log('data', data);
        return ctaRef.set(data, { merge: true })
                     .then(() => {
                         this.router.navigate(['/admin/call-to-action']);
                         this.sbAlert.open('Call To Action created', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Call To Action created', data);
                     })
                     .catch((error) => console.log(`ERROR~sCTA: `, error));
    }

    updateCTA(formData): Promise<void> {
        const nameToUrl = this.stringToSlug(formData.name);
        const ctaRef: AngularFirestoreDocument<CallToAction> = this.afs.doc(`call-to-actions/${formData.id}`);

        const data: CallToAction = {
            author: this.currentUser,
            body: formData.body,
            buttonUrl: formData.buttonUrl,
            buttonText: formData.buttonText,
            createdAt: formData.createdAt,
            id: formData.id,
            imageUrl: formData.imageUrl,
            isExtUrl: formData.isExtUrl || false,
            name: formData.name,
            published: formData.published || false,
            subtitle: formData.subtitle,
            updatedAt: Date.now(),
            title: formData.title,
            value: nameToUrl,
            videoUrl: formData.videoUrl,
        };

        console.log('data', data);
        return ctaRef.set(data)
                     .then(() => {
                         this.router.navigate(['/admin/call-to-action']);
                         this.sbAlert.open('Call To Action updated', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Call To Action updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uCTA: `, error));
    }
}
