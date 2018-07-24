import { EventEmitter, Injectable } from '@angular/core';
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

    constructor() {
        if (localStorage.getItem('settings') !== null) {
            this.localSettings = JSON.parse(localStorage.getItem('settings'));
        } else {
            this.saveSettings(this.presetSettings);
        }
    }

    getAdminSettings(): Settings {
        if (localStorage.getItem('settings') !== null) {
            const local = localStorage.getItem('settings');
            return JSON.parse(local);
        } else {
            return this.presetSettings;
        }
    }

    saveSettings(settings: Settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
        // this.settingsAdded.emit(settings);
    }


}


