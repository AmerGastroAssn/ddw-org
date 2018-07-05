import { Injectable } from '@angular/core';
import { Settings } from '../models/Settings';

@Injectable({
    providedIn: 'root'
})
export class AdminSettingsService {
    settings: Settings = {
        allowSignup: true,
        disableAdmin: true,
    };

    constructor() {
    }

    getAdminSettings(): Settings {
        return this.settings;
    }
}
