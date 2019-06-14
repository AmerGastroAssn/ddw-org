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
import { environment } from '../../../../environments/environment';

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
    cardsHidden: boolean;
    videoTitle: string;
    videoSubtitle: string;
    videoHidden: boolean;
    postsTitle: string;
    postsSubtitle: string;
    postsButtonText: string;
    postsButtonURL: string;
    postsHidden: boolean;
    onDemandTitle: string;
    onDemandText: string;
    onDemandButtonText: string;
    onDemandButtonURL: string;
    onDemandHidden: boolean;
    byTheNumbersTitle: string;
    byTheNumbersOneNumber: string;
    byTheNumbersOneSubtitle: string;
    byTheNumbersTwoNumber: string;
    byTheNumbersTwoSubtitle: string;
    byTheNumbersThreeNumber: string;
    byTheNumbersThreeSubtitle: string;
    byTheNumbersHidden: boolean;
    sponsorTitle: string;
    sponsorOneImg: string;
    sponsorOneURL: string;
    sponsorTwoImg: string;
    sponsorTwoURL: string;
    sponsorThreeImg: string;
    sponsorThreeURL: string;
    sponsorFourImg: string;
    sponsorFourURL: string;
    sponsorHidden: boolean;
    calendars$: Observable<Calendar[]>;
    hasCalendar: boolean;
    calendarTitle: string;
    calendarSectionTitle: string;
    bannerButtonText: string;
    bannerButtonURL: string;
    hasBannerButton: boolean;
    bannerButtonIsExtUrl: boolean;
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;


    constructor(
      private flashMessage: FlashMessagesService,
      private sbAlert: MatSnackBar,
      private fb: FormBuilder,
      private countdownService: CountdownService,
      private adminHomePageService: AdminHomePageService,
      private calendarService: AdminCalendarService
    ) {
        this.mceApiKey = environment.mceApiKey;
        this.mceConfig = {
            height: 700,
            plugins: 'code, codesample, lists, tinymcespellchecker, link, preview, fullscreen, advcode',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'SASS', value: 'sass' },
                { text: 'SCSS', value: 'scss' },
                { text: 'TypeScript', value: 'typescript' },
            ],
            // tslint:disable-next-line:max-line-length
            toolbar: 'undo redo fontsizeselect styleselect bold italic link unlink openLink forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent fullscreen code preview',
            body_id: 'tiny-mce-textarea',
            // tslint:disable-next-line:max-line-length
            content_style: `body{font-family:'Open Sans',Roboto,'Helvetica Neue',sans-serif!important;line-height:2rem!important;font-size:1.2rem!important}a,a:link{color:#2e6da4}a.btn.btn-warning.btn-lg{background-color:#f47700;color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:700;text-decoration:none;padding:.5em 2em;font-size:18px}a.btn.btn-warning.btn-lg:hover{background-color:#feb512;color:#004060;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:400;text-decoration:none;padding:.5em 2em;font-size:18px}
                `,
            content_css: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
        };
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
        this.adminHomePageService.getHomePage().subscribe((values) => {
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
                    cardsHidden: [this.homePage.cardsHidden],
                    videoTitle: [this.homePage.videoTitle],
                    videoSubtitle: [this.homePage.videoSubtitle],
                    videoHidden: [this.homePage.videoHidden],
                    postsTitle: [this.homePage.postsTitle],
                    postsSubtitle: [this.homePage.postsSubtitle],
                    postsButtonText: [this.homePage.postsButtonText],
                    postsButtonURL: [this.homePage.postsButtonURL],
                    postsHidden: [this.homePage.postsHidden],
                    onDemandTitle: [this.homePage.onDemandTitle],
                    onDemandText: [this.homePage.onDemandText],
                    onDemandButtonText: [this.homePage.onDemandButtonText],
                    onDemandButtonURL: [this.homePage.onDemandButtonURL],
                    onDemandHidden: [this.homePage.onDemandHidden],
                    byTheNumbersTitle: [this.homePage.byTheNumbersTitle],
                    byTheNumbersOneNumber: [this.homePage.byTheNumbersOneNumber],
                    byTheNumbersOneSubtitle: [this.homePage.byTheNumbersOneSubtitle],
                    byTheNumbersTwoNumber: [this.homePage.byTheNumbersTwoNumber],
                    byTheNumbersTwoSubtitle: [this.homePage.byTheNumbersTwoSubtitle],
                    byTheNumbersThreeNumber: [this.homePage.byTheNumbersThreeNumber],
                    byTheNumbersThreeSubtitle: [this.homePage.byTheNumbersThreeSubtitle],
                    byTheNumbersHidden: [this.homePage.byTheNumbersHidden],
                    sponsorTitle: [this.homePage.sponsorTitle],
                    sponsorOneImg: [this.homePage.sponsorOneImg],
                    sponsorOneURL: [this.homePage.sponsorOneURL],
                    sponsorTwoImg: [this.homePage.sponsorTwoImg],
                    sponsorTwoURL: [this.homePage.sponsorTwoURL],
                    sponsorThreeImg: [this.homePage.sponsorThreeImg],
                    sponsorThreeURL: [this.homePage.sponsorThreeURL],
                    sponsorFourImg: [this.homePage.sponsorFourImg],
                    sponsorFourURL: [this.homePage.sponsorFourURL],
                    sponsorHidden: [this.homePage.sponsorHidden],
                    hasCalendar: [this.homePage.hasCalendar || false],
                    calendarTitle: [this.homePage.calendarTitle],
                    calendarSectionTitle: [this.homePage.calendarSectionTitle],
                    bannerButtonText: [this.homePage.bannerButtonText],
                    bannerButtonURL: [this.homePage.bannerButtonURL],
                    hasBannerButton: [this.homePage.hasBannerButton],
                    bannerButtonIsExtUrl: [this.homePage.bannerButtonIsExtUrl],
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
                this.cardsHidden = this.homePageForm.value.cardsHidden;
                this.videoTitle = this.homePageForm.value.videoTitle;
                this.videoSubtitle = this.homePageForm.value.videoSubtitle;
                this.videoHidden = this.homePageForm.value.videoHidden;
                this.postsTitle = this.homePageForm.value.postsTitle;
                this.postsSubtitle = this.homePageForm.value.postsSubtitle;
                this.postsButtonText = this.homePageForm.value.postsButtonText;
                this.postsButtonURL = this.homePageForm.value.postsButtonURL;
                this.postsHidden = this.homePageForm.value.postsHidden;
                this.onDemandTitle = this.homePageForm.value.onDemandTitle;
                this.onDemandText = this.homePageForm.value.onDemandText;
                this.onDemandButtonText = this.homePageForm.value.onDemandButtonText;
                this.onDemandButtonURL = this.homePageForm.value.onDemandButtonURL;
                this.onDemandHidden = this.homePageForm.value.onDemandHidden;
                this.byTheNumbersTitle = this.homePageForm.value.byTheNumbersTitle;
                this.byTheNumbersOneNumber = this.homePageForm.value.byTheNumbersOneNumber;
                this.byTheNumbersOneSubtitle = this.homePageForm.value.byTheNumbersOneSubtitle;
                this.byTheNumbersTwoNumber = this.homePageForm.value.byTheNumbersTwoNumber;
                this.byTheNumbersTwoSubtitle = this.homePageForm.value.byTheNumbersTwoSubtitle;
                this.byTheNumbersThreeNumber = this.homePageForm.value.byTheNumbersThreeNumber;
                this.byTheNumbersThreeSubtitle = this.homePageForm.value.byTheNumbersThreeSubtitle;
                this.byTheNumbersHidden = this.homePageForm.value.byTheNumbersHidden;
                this.sponsorTitle = this.homePageForm.value.sponsorTitle;
                this.sponsorOneImg = this.homePageForm.value.sponsorOneImg;
                this.sponsorOneURL = this.homePageForm.value.sponsorOneURL;
                this.sponsorTwoImg = this.homePageForm.value.sponsorTwoImg;
                this.sponsorTwoURL = this.homePageForm.value.sponsorTwoURL;
                this.sponsorThreeImg = this.homePageForm.value.sponsorThreeImg;
                this.sponsorThreeURL = this.homePageForm.value.sponsorThreeURL;
                this.sponsorFourImg = this.homePageForm.value.sponsorFourImg;
                this.sponsorFourURL = this.homePageForm.value.sponsorFourURL;
                this.sponsorHidden = this.homePageForm.value.sponsorHidden;
                this.hasCalendar = this.homePageForm.value.hasCalendar;
                this.calendarTitle = this.homePageForm.value.calendarTitle;
                this.calendarSectionTitle = this.homePageForm.value.calendarSectionTitle;
                this.bannerButtonText = this.homePageForm.value.bannerButtonText;
                this.bannerButtonURL = this.homePageForm.value.bannerButtonURL;
                this.hasBannerButton = this.homePageForm.value.hasBannerButton;
                this.bannerButtonIsExtUrl = this.homePageForm.value.bannerButtonIsExtUrl;
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
    }

    onHomePageSubmit(homePageFormData) {
        this.adminHomePageService.updateHomeForm(homePageFormData);
    }

    toggleHasCalendar() {
        this.homePage.hasCalendar = !this.homePage.hasCalendar;
    }

    toggleCardsHidden() {
        this.homePage.cardsHidden = !this.homePage.cardsHidden;
    }

    toggleVideoHidden() {
        this.homePage.videoHidden = !this.homePage.videoHidden;
    }

    togglePostsHidden() {
        this.homePage.postsHidden = !this.homePage.postsHidden;
    }

    toggleOnDemandHidden() {
        this.homePage.onDemandHidden = !this.homePage.onDemandHidden;
    }

    toggleByTheNumbersHidden() {
        this.homePage.byTheNumbersHidden = !this.homePage.byTheNumbersHidden;
    }

    toggleSponsorHidden() {
        this.homePage.sponsorHidden = !this.homePage.sponsorHidden;
    }

    toggleHasBannerButton() {
        this.homePage.hasBannerButton = !this.homePage.hasBannerButton;
    }

    toggleBannerButtonIsExtURL () {
        this.homePage.bannerButtonIsExtUrl = !this.homePage.bannerButtonIsExtUrl;
    }

}
