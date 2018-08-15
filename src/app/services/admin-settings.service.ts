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


    /*------------------------------------------------
     Default settings pre-defined before admin can set them.
     If you set disableSettings === true,
     it will prevent page from being rendered
     1. allowSignup allows users to be able to create account.
     2. allowSettings allows admin to edit their settings.
     3. disableAdmin prevents a user from making new user admin.
     ------------------------------------------------*/
    presetSettings: Settings = {
        allowSignup: true,
        allowSettings: true,
        disableAdmin: false,
    };


    constructor(
      private sbAlert: MatSnackBar,
      private afs: AngularFirestore,
    ) {
        this.video$Key = 'TsCwvT2a4VolBZrvTbOS';

        if (localStorage.getItem('settings') !== null) {
            this.localSettings = JSON.parse(localStorage.getItem('settings'));
        } else {
            // this.localSettings = this.presetSettings;
            // this.saveSettings(this.settingsAdded);
        }
    }

    getAdminSettings(): Settings {
        if (localStorage.getItem('settings') !== null) {
            const local = localStorage.getItem('settings');
            return this.localSettings = JSON.parse(local);
        } else {
            this.saveSettings(this.presetSettings);
            // return this.presetSettings;
        }
    }


    saveSettings(settings) {
        // const newSettings = new Settings(settings);
        localStorage.setItem('settings', JSON.stringify(settings));
        this.settingsAdded.emit(settings);
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


}


