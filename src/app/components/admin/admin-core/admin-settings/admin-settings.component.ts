import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../../../models/Settings';
import { AdminSettingsService } from '../../../../services/admin-settings.service';

@Component({
    selector: 'ddw-admin-settings',
    templateUrl: './admin-settings.component.html',
    styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
    allowSettings: Boolean;
    settings: Settings;

    constructor(
      private settingsService: AdminSettingsService,
      private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        // Settings
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;
        this.settings = this.settingsService.getAdminSettings();
    }

    onSettingsSubmit() {
        this.settingsService.saveSettings(this.settings);

        this.flashMessage.show(`Settings Saved!`, {
            cssClass: 'alert-success',
            timeout: 2500
        });
    }

}
