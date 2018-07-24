import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../../../models/Settings';
import { AdminSettingsService } from '../../../../services/admin-settings.service';

@Component({
    selector: 'ddw-admin-settings',
    templateUrl: './admin-settings.component.html',
    styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
    @ViewChild('settingsForm') settingsForm: NgForm;
    settingsAllowed: boolean; // Allow settings to be edited/viewed.

    settings: Settings;
    allowSignup: boolean;
    allowSettings: boolean;
    disableAdmin: boolean;


    constructor(
      public settingsService: AdminSettingsService,
      private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        // Settings
        this.settingsAllowed = this.settingsService.getAdminSettings().allowSettings;

        this.settings = this.settingsService.getAdminSettings();
        this.allowSignup = this.settings.allowSignup;
        this.disableAdmin = this.settings.disableAdmin;
        this.allowSettings = this.settings.allowSettings;
    }

    onSettingsSubmit(form: NgForm) {
        const value = form.value;
        this.settingsService.saveSettings(value);
        console.log(value);

        this.flashMessage.show(`Settings Saved!`, {
            cssClass: 'alert-success',
            timeout: 2500
        });
    }

}
