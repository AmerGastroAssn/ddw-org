import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { FeaturedPost } from '../../../models/FeaturedPost';
import { HomePage } from '../../../models/HomePage';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminFeaturedPostService } from '../../../services/admin-featured-post.service';
import { AdminHomePageService } from '../../../services/admin-home-page.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
import { AdminSettingsService } from '../../../services/admin-settings.service';
import { CountdownService, Time } from '../../../services/countdown.service';


@Component({
    selector: 'ddw-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title: string;
    subtitle: string;
    forTime: string;
    subheaderLoc: string;
    subheaderDate: string;
    cards$: Observable<Card[]>;

    countdownTime: string;
    time1$: Observable<Time>;
    time2$: Observable<Time>;
    datePipe: any;
    featuredPosts$: Observable<FeaturedPost[]>;
    headerbar: any;
    footerbar: any;
    safeVideoURL: any;
    videoURL: string;
    homePage: HomePage;
    calendars$: Observable<Calendar[]>;
    hasCalendar: boolean;
    calendarTitle: string;

    constructor(
      private countdownService: CountdownService,
      private cardService: AdminCardService,
      private adsService: AdminAdsService,
      private featuredPostService: AdminFeaturedPostService,
      private settingsService: AdminSettingsService,
      public sanitizer: DomSanitizer,
      private meta: Meta,
      private metaService: AdminMetaService,
      private adminHomePageService: AdminHomePageService,
      private titleService: Title,
      private calendarService: AdminCalendarService,
    ) {

    }

    ngOnInit() {
        // For page title
        this.titleService.setTitle('Home - DDW Website');
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (meta) {
                    this.meta.addTags([
                        { name: 'description', content: meta.metaDesc },
                        { name: 'author', content: meta.metaAuthor },
                        { name: 'keywords', content: meta.metaKeywords },
                        { property: 'canonical', href: 'https://ddw.org/home' },
                        { property: 'og:url', content: 'https://ddw.org' },
                        { property: 'og:title', content: `Digestive Digest Week®` },
                        { property: 'og:site_name', content: `Digestive Digest Week®` },
                        { property: 'og:see_also', content: `http://ddw.org/home` },
                        { property: 'og:description', content: meta.metaDesc },
                        {
                            property: 'og:image',
                            content: meta.metaImageURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/logos/ddw-color.png'
                        },
                        { itemprop: 'name', content: 'http://ddw.org/home' },
                        { itemprop: 'description', content: meta.metaDesc },
                        {
                            itemprop: 'image',
                            content: meta.metaImageURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/logos/ddw-color.png'
                        },
                        { name: 'twitter:card', content: 'summary_large_image' },
                        { name: 'twitter:creator', content: '@DDWMeeting' },
                        { name: 'twitter:url', content: 'https://ddw.org/home' },
                        { name: 'twitter:site', content: '@DDWMeeting' },
                        { name: 'twitter:title', content: `Digestive Digest Week®` },
                        { name: 'twitter:description', content: meta.metaDesc },
                        {
                            name: 'twitter:image',
                            content: meta.metaImageURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/logos/ddw-color.png'
                        },

                    ], true);
                }
            });

        // Home Page Sections
        this.adminHomePageService.getHomeForm()
            .subscribe((homePage) => {
                this.homePage = homePage;
                this.calendars$ = this.calendarService.getCalendarByTitle(this.homePage.calendarTitle);
            });

        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
            });

        // Page elements
        this.cards$ = this.cardService.getAllCards();
        this.featuredPosts$ = this.featuredPostService.getAllPosts();
        this.adminHomePageService.getVideoURL()
            .subscribe((dailyVideo) => {
                this.safeVideoURL = this.sanitizer.bypassSecurityTrustResourceUrl(dailyVideo.videoURL);
                this.videoURL = dailyVideo.videoURL;
            });

        // Countdown
        this.countdownService.getCountdown()
            .subscribe((countdown) => {
                const newDate = Date.parse(countdown.date);
                this.time1$ = this.countdownService.timer(new Date(countdown.date.toDate()));
                // To put Date in manually.
                // this.time1$ = this.countdownService.timer(new Date('May 18, 2019 00:00:00'));
            });

    }

    videoURLToggle() {

    }

}
