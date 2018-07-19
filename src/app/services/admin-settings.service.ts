import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
    providedIn: 'root'
})
export class AdminSettingsService {
    settings: Settings = {
        allowSignup: true,
        allowSettings: true,
        disableAdmin: false,
    };

    constructor() {
        if (localStorage.getItem('settings') !== null) {
            this.settings = JSON.parse(localStorage.getItem('settings'));
        }
    }

    getAdminSettings(): Settings {
        return this.settings;
    }

    saveSettings(settings: Settings) {
        localStorage.setItem('settings', JSON.stringify(settings));
    }

}


