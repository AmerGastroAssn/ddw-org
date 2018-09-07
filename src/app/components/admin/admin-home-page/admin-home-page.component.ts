import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { Countdown } from '../../../models/Countdown';
import { DailyVideo } from '../../../models/DailyVideo';
import { HomePage } from '../../../models/HomePage';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
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
    cardsTitle: string;
    cardsSubtitle: string;
    videoTitle: string;
    videoSubtitle: string;
    postsTitle: string;
    postsSubtitle: string;
    postsButtonText: string;
    postsButtonURL: string;
    onDemandTitle: string;
    onDemandText: string;
    onDemandButtonText: string;
    onDemandButtonURL: string;
    byTheNumbersTitle: string;
    byTheNumbersOneNumber: string;
    byTheNumbersOneSubtitle: string;
    byTheNumbersTwoNumber: string;
    byTheNumbersTwoSubtitle: string;
    byTheNumbersThreeNumber: string;
    byTheNumbersThreeSubtitle: string;
    sponsorTitle: string;
    sponsorOneImg: string;
    sponsorOneURL: string;
    sponsorTwoImg: string;
    sponsorTwoURL: string;
    sponsorThreeImg: string;
    sponsorThreeURL: string;
    sponsorFourImg: string;
    sponsorFourURL: string;
    calendars$: Observable<Calendar[]>;
    hasCalendar: boolean;
    calendarTitle: string;
    calendarSectionTitle: string;


    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id,rel];*(*);*{*}',
    };

    constructor(
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService,
      private adminHomePageService: AdminHomePageService,
      private calendarService: AdminCalendarService
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
                    cardsTitle: [this.homePage.cardsTitle],
                    cardsSubtitle: [this.homePage.cardsSubtitle],
                    videoTitle: [this.homePage.videoTitle],
                    videoSubtitle: [this.homePage.videoSubtitle],
                    postsTitle: [this.homePage.postsTitle],
                    postsSubtitle: [this.homePage.postsSubtitle],
                    postsButtonText: [this.homePage.postsButtonText],
                    postsButtonURL: [this.homePage.postsButtonURL],
                    onDemandTitle: [this.homePage.onDemandTitle],
                    onDemandText: [this.homePage.onDemandText],
                    onDemandButtonText: [this.homePage.onDemandButtonText],
                    onDemandButtonURL: [this.homePage.onDemandButtonURL],
                    byTheNumbersTitle: [this.homePage.byTheNumbersTitle],
                    byTheNumbersOneNumber: [this.homePage.byTheNumbersOneNumber],
                    byTheNumbersOneSubtitle: [this.homePage.byTheNumbersOneSubtitle],
                    byTheNumbersTwoNumber: [this.homePage.byTheNumbersTwoNumber],
                    byTheNumbersTwoSubtitle: [this.homePage.byTheNumbersTwoSubtitle],
                    byTheNumbersThreeNumber: [this.homePage.byTheNumbersThreeNumber],
                    byTheNumbersThreeSubtitle: [this.homePage.byTheNumbersThreeSubtitle],
                    sponsorTitle: [this.homePage.sponsorTitle],
                    sponsorOneImg: [this.homePage.sponsorOneImg],
                    sponsorOneURL: [this.homePage.sponsorOneURL],
                    sponsorTwoImg: [this.homePage.sponsorTwoImg],
                    sponsorTwoURL: [this.homePage.sponsorTwoURL],
                    sponsorThreeImg: [this.homePage.sponsorThreeImg],
                    sponsorThreeURL: [this.homePage.sponsorThreeURL],
                    sponsorFourImg: [this.homePage.sponsorFourImg],
                    sponsorFourURL: [this.homePage.sponsorFourURL],
                    hasCalendar: [this.homePage.hasCalendar || false],
                    calendarTitle: [this.homePage.calendarTitle],
                    calendarSectionTitle: [this.homePage.calendarSectionTitle],
                });

                this.$key = this.homePageForm.value.$key;
                this.uid = this.homePageForm.value.uid;
                this.title = this.homePageForm.value.title;
                this.subtitle = this.homePageForm.value.subtitle;
                this.forTime = this.homePageForm.value.forTime;
                this.subheaderLoc = this.homePageForm.value.subheaderLoc;
                this.subheaderDate = this.homePageForm.value.subheaderDate;
                this.cardsTitle = this.homePageForm.value.cardsTitle;
                this.cardsSubtitle = this.homePageForm.value.cardsSubtitle;
                this.videoTitle = this.homePageForm.value.videoTitle;
                this.videoSubtitle = this.homePageForm.value.videoSubtitle;
                this.postsTitle = this.homePageForm.value.postsTitle;
                this.postsSubtitle = this.homePageForm.value.postsSubtitle;
                this.postsButtonText = this.homePageForm.value.postsButtonText;
                this.postsButtonURL = this.homePageForm.value.postsButtonURL;
                this.onDemandTitle = this.homePageForm.value.onDemandTitle;
                this.onDemandText = this.homePageForm.value.onDemandText;
                this.onDemandButtonText = this.homePageForm.value.onDemandButtonText;
                this.onDemandButtonURL = this.homePageForm.value.onDemandButtonURL;
                this.byTheNumbersTitle = this.homePageForm.value.byTheNumbersTitle;
                this.byTheNumbersOneNumber = this.homePageForm.value.byTheNumbersOneNumber;
                this.byTheNumbersOneSubtitle = this.homePageForm.value.byTheNumbersOneSubtitle;
                this.byTheNumbersTwoNumber = this.homePageForm.value.byTheNumbersTwoNumber;
                this.byTheNumbersTwoSubtitle = this.homePageForm.value.byTheNumbersTwoSubtitle;
                this.byTheNumbersThreeNumber = this.homePageForm.value.byTheNumbersThreeNumber;
                this.byTheNumbersThreeSubtitle = this.homePageForm.value.byTheNumbersThreeSubtitle;
                this.sponsorTitle = this.homePageForm.value.sponsorTitle;
                this.sponsorOneImg = this.homePageForm.value.sponsorOneImg;
                this.sponsorOneURL = this.homePageForm.value.sponsorOneURL;
                this.sponsorTwoImg = this.homePageForm.value.sponsorTwoImg;
                this.sponsorTwoURL = this.homePageForm.value.sponsorTwoURL;
                this.sponsorThreeImg = this.homePageForm.value.sponsorThreeImg;
                this.sponsorThreeURL = this.homePageForm.value.sponsorThreeURL;
                this.sponsorFourImg = this.homePageForm.value.sponsorFourImg;
                this.sponsorFourURL = this.homePageForm.value.sponsorFourURL;
                this.hasCalendar = this.homePageForm.value.hasCalendar;
                this.calendarTitle = this.homePageForm.value.calendarTitle;
                this.calendarSectionTitle = this.homePageForm.value.calendarSectionTitle;
            }
        });
    }

    ngOnInit() {
        this.calendars$ = this.calendarService.getAllCalendars();
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

    toggleHasCalendar() {
        console.log('this.homepage', this.homePage);
        this.homePage.hasCalendar = !this.homePage.hasCalendar;
    }

}
