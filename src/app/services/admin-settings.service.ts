import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Countdown } from '../models/Countdown';
import { Settings } from '../models/Settings';

@Injectable({
    providedIn: 'root'
})
export class AdminSettingsService {
    settingsAdded = new EventEmitter<Settings>();
    localSettings: Settings;


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

    constructor(private sbAlert: MatSnackBar) {

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




}


