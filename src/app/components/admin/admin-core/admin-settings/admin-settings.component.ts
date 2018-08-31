import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Countdown } from '../../../../models/Countdown';
import { DailyVideo } from '../../../../models/DailyVideo';
import { Settings } from '../../../../models/Settings';
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
    // Countdown
    countdownForm: FormGroup;
    countdown: Countdown;
    date: any;
    bsConfig: Partial<BsDatepickerConfig>;
    // DDW Daily Video Form
    dailyVideoForm: FormGroup;
    dailyVideo: DailyVideo;
    videoURL: string;


    constructor(
      public settingsService: AdminSettingsService,
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService
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

        // Get Countdown
        this.countdownService.getCountdown().subscribe((countdown) => {
            if (countdown !== null) {
                this.countdown = countdown;
                // Form:
                this.countdownForm = this.fb.group({
                    $key: [this.countdown.$key],
                    date: [this.countdown.date],
                    uid: [this.countdown.uid],
                });

                this.$key = this.countdownForm.value.$key;
                this.date = this.countdownForm.value.date;
                this.uid = this.countdownForm.value.uid;
            }
        });

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm:ss a'
          });


        // Video URL
        this.settingsService.getVideoURL().subscribe((url) => {
            if (url !== null) {
                this.dailyVideo = url;
                // Form:
                this.dailyVideoForm = this.fb.group({
                    $key: [this.dailyVideo.$key],
                    uid: [this.dailyVideo.uid],
                    videoURL: [this.dailyVideo.videoURL],
                });

                this.$key = this.dailyVideoForm.value.$key;
                this.uid = this.dailyVideoForm.value.uid;
                this.videoURL = this.dailyVideoForm.value.videoURL;
            }
        });
    }

    ngOnInit() {


    }

    onSettingsSubmit(formData) {
        this.settingsService.updateSettings(formData);
    }

    onCountdownSubmit(cdFormData) {
        this.countdownService.updateCountdown(cdFormData);
    }

    onDailyVideoSubmit(videoForm) {
        this.settingsService.updateVideoURL(videoForm);
        console.log('videoForm', videoForm);
    }

}
