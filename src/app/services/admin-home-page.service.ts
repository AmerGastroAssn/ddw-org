import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DailyVideo } from '../models/DailyVideo';
import { HomePage } from '../models/HomePage';

@Injectable({
    providedIn: 'root'
})
export class AdminHomePageService {
    videoDoc: AngularFirestoreDocument<DailyVideo>;
    video$: Observable<DailyVideo>;
    video$key: string;
    homeDoc: AngularFirestoreDocument<HomePage>;
    home$: Observable<HomePage>;
    home$key: string;

    constructor(
      private sbAlert: MatSnackBar,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth,
    ) {
        this.video$key = 'TsCwvT2a4VolBZrvTbOS';
        this.home$key = 'iKCpMdHlnJHKBzLbfmZs';
    }

    getVideoURL(): Observable<DailyVideo> {
        this.videoDoc = this.afs.doc<DailyVideo>(`dailyVideo/${this.video$key}`);
        this.video$ = this.videoDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as DailyVideo;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.video$;
    }


    getHomePage(): Observable<HomePage> {
        this.homeDoc = this.afs.doc<HomePage>(`homePage/${this.home$key}`);
        this.home$ = this.homeDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as HomePage;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.home$;
    }

    updateVideoURL(updatedVideoURL): void {
        this.videoDoc = this.afs.doc<DailyVideo>(`dailyVideo/${this.video$key}`);

        this.videoDoc.update(updatedVideoURL)
            .then(() => {
                this.sbAlert.open('Video URL was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Video URL updated', updatedVideoURL);
            })
            .catch((error) => {
                this.sbAlert.open('Video URL was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uDV: `, error);
            });
    }


    updateHomeForm(formData): void {
        this.homeDoc = this.afs.doc<HomePage>(`homePage/${this.home$key}`);

        this.homeDoc.update(formData)
            .then(() => {
                this.sbAlert.open('Home Page Form Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Video URL updated', formData);
            })
            .catch((error) => {
                this.sbAlert.open('Home Page Form NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uHF: `, error);
            });
    }
}
