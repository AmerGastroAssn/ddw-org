import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Settings } from '../../../../models/Settings';
import { AdminHomePageService } from '../../../../services/admin-home-page.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { CountdownService } from '../../../../services/countdown.service';

@Component({
    selector: 'ddw-admin-settings',
    templateUrl: './admin-settings.component.html',
    styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
    // Settings
    settingsForm: FormGroup;
    settings: Settings;
    $key: string;
    allowSignup: boolean;
    allowSettings: boolean;
    disableAdmin: boolean;
    uid: string;
    settingsAllowed: boolean; // Allow settings to be edited/viewed.


    constructor(
      public settingsService: AdminSettingsService,
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService,
      private adminHomePageService: AdminHomePageService
    ) {
        // Settings
        this.settingsAllowed = this.settingsService.getAdminSettings().allowSettings;

        // Settings Form
        this.settingsService.getSettings().subscribe((settingsData) => {
            if (settingsData !== null) {
                this.settings = settingsData;
                // Form:
                this.settingsForm = this.fb.group({
                    $key: [this.settings.$key],
                    allowSignup: [this.settings.allowSignup],
                    allowSettings: [this.settings.allowSettings],
                    disableAdmin: [this.settings.disableAdmin],
                    uid: [this.settings.uid],
                });

                this.$key = this.settingsForm.value.$key;
                this.allowSignup = this.settingsForm.value.allowSignup;
                this.allowSettings = this.settingsForm.value.allowSettings;
                this.disableAdmin = this.settingsForm.value.disableAdmin;
                this.uid = this.settingsForm.value.uid;
            }
        });


    }

    ngOnInit() {
    }

    onSettingsSubmit(formData) {
        this.settingsService.updateSettings(formData);
    }


}
