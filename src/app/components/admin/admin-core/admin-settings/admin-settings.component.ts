import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Countdown } from '../../../../models/Countdown';
import { Settings } from '../../../../models/Settings';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { CountdownService } from '../../../../services/countdown.service';

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
    // Countdown
    countdownForm: FormGroup;
    countdown: Countdown;
    date: any;
    $key: string;
    uid: string;
    bsConfig: Partial<BsDatepickerConfig>;


    constructor(
      public settingsService: AdminSettingsService,
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService
    ) {
        // Get Countdown
        this.countdownService.getCountdown().subscribe((countdown) => {
            if (countdown !== null) {
                this.countdown = countdown;
                // Form:
                this.countdownForm = this.fb.group({
                    $key: [this.countdown.$key],
                    date: [this.date],
                    uid: [this.countdown.uid],
                });

                this.$key = this.countdownForm.value.$key;
                this.date = this.countdownForm.value.date;
                this.uid = this.countdownForm.value.uid;
                console.log(this.date);
            }
        });

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm:ss a'
          });
    }

    ngOnInit() {
        // Settings
        this.settingsAllowed = this.settingsService.getAdminSettings().allowSettings;

        this.settings = this.settingsService.getAdminSettings();
        this.allowSignup = this.settings.allowSignup;
        this.disableAdmin = this.settings.disableAdmin;
        this.allowSettings = this.settings.allowSettings;


    }

    onSettingsSubmit(formData) {
        const value = formData.value;
        this.settingsService.saveSettings(value);
        console.log(value);

        this.sbAlert.open('Settings Saved!', 'Dismiss', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-success']
        });
    }

    onCountdownSubmit(cdFormData) {
        this.countdownService.updateCountdown(cdFormData);
        console.log('cdFormData', cdFormData);

    }

}
