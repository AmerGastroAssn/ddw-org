import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { DailyVideo } from '../models/DailyVideo';
import { Settings } from '../models/Settings';

@Injectable({
    providedIn: 'root'
})
export class AdminSettingsService {
    settingsAdded = new EventEmitter<Settings>();
    localSettings: Settings;
    videoDoc: AngularFirestoreDocument<DailyVideo>;
    video$: Observable<DailyVideo>;
    video$Key: string;
    settingsDoc: AngularFirestoreDocument<Settings>;
    settings$: Observable<Settings>;
    settings: Settings;
    settings$key: string;


    constructor(
      private sbAlert: MatSnackBar,
      private afs: AngularFirestore,
    ) {
        this.video$Key = 'TsCwvT2a4VolBZrvTbOS';
        this.settings$key = 'YgCYgsItfFPq4DkNCHZq';

        this.getSettings()
            .subscribe(settings => {
                return this.settings = settings;
            });

        if (localStorage.getItem('settings') !== null) {
            this.localSettings = JSON.parse(localStorage.getItem('settings'));
        }
    }

    /* If settings not in local storage, then
     get settings from Firestore and save in local storage to use */
    getAdminSettings(): Settings {
        if (localStorage.getItem('settings') !== null) {
            const local = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);
        } else {
            this.saveLocalSettings();
            const local = localStorage.getItem('settings');
            return JSON.parse(local);
        }
    }


    saveLocalSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.settingsAdded.emit(this.settings);
    }

    getVideoURL(): Observable<DailyVideo> {
        this.videoDoc = this.afs.doc<DailyVideo>(`dailyVideo/${this.video$Key}`);
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

    getSettings(): Observable<Settings> {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);
        this.settings$ = this.settingsDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Settings;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.settings$;
    }

    updateVideoURL(updatedVideoURL): void {
        this.videoDoc = this.afs.doc<DailyVideo>(`dailyVideo/${this.video$Key}`);

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

    updateSettings(settings): void {
        this.settingsDoc = this.afs.doc<Settings>(`settings/${this.settings$key}`);

        this.settingsDoc.update(settings)
            .then(() => {
                this.saveLocalSettings();
                this.sbAlert.open('Settings Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Settings updated', settings);
            })
            .catch((error) => {
                this.sbAlert.open('Settings NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uDV: `, error);
            });
    }


}


