import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Countdown } from '../../../models/Countdown';
import { DailyVideo } from '../../../models/DailyVideo';
import { HomePage } from '../../../models/HomePage';
import { AdminHomePageService } from '../../../services/admin-home-page.service';
import { CountdownService } from '../../../services/countdown.service';

@Component({
    selector: 'ddw-admin-home-page',
    templateUrl: './admin-home-page.component.html',
    styleUrls: ['./admin-home-page.component.css']
})
export class AdminHomePageComponent implements OnInit {
    $key: string;
    uid: string;
    // Countdown
    countdownForm: FormGroup;
    countdown: Countdown;
    date: any;
    bsConfig: Partial<BsDatepickerConfig>;
    // DDW Daily Video Form
    dailyVideoForm: FormGroup;
    dailyVideo: DailyVideo;
    videoURL: string;
    // Sections Form
    homePageForm: FormGroup;
    homePage: HomePage;
    title: string;
    subtitle: string;
    forTime: string;
    subheaderLoc: string;
    subheaderDate: string;


    constructor(
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService,
      private adminHomePageService: AdminHomePageService
    ) {
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
        this.adminHomePageService.getVideoURL().subscribe((url) => {
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

        // Home Form:
        this.adminHomePageService.getHomeForm().subscribe((values) => {
            if (values !== null) {
                this.homePage = values;
                // Form:
                this.homePageForm = this.fb.group({
                    $key: [this.homePage.$key],
                    uid: [this.homePage.uid],
                    title: [this.homePage.title],
                    subtitle: [this.homePage.subtitle],
                    forTime: [this.homePage.forTime],
                    subheaderLoc: [this.homePage.subheaderLoc],
                    subheaderDate: [this.homePage.subheaderDate],
                });

                this.$key = this.homePageForm.value.$key;
                this.uid = this.homePageForm.value.uid;
                this.title = this.homePageForm.value.title;
                this.subtitle = this.homePageForm.value.subtitle;
                this.forTime = this.homePageForm.value.forTime;
                this.subheaderLoc = this.homePageForm.value.subheaderLoc;
                this.subheaderDate = this.homePageForm.value.subheaderDate;
            }
        });
    }

    ngOnInit() {
    }


    onCountdownSubmit(cdFormData) {
        this.countdownService.updateCountdown(cdFormData);
    }

    onDailyVideoSubmit(videoForm) {
        this.adminHomePageService.updateVideoURL(videoForm);
        console.log('videoForm', videoForm);
    }

    onHomePageSubmit(homePageFormData) {
        this.adminHomePageService.updateHomeForm(homePageFormData);
        console.log('homePageFormData sent', homePageFormData);
    }

}
