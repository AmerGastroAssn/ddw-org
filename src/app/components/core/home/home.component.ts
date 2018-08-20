import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Card } from '../../../models/Card';
import { FeaturedPost } from '../../../models/FeaturedPost';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminFeaturedPostService } from '../../../services/admin-featured-post.service';
import { AdminSettingsService } from '../../../services/admin-settings.service';
import { CountdownService, Time } from '../../../services/countdown.service';


@Component({
    selector: 'ddw-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = `Digestive Disease Week®`;
    subtitle = 'The Global Leader';
    forTime = 'for 50 Years';
    subheaderLoc = 'San Diego Convention Center | San Diego, CA';
    subheaderDate = 'May 18-21, 2019';
    cards$: Observable<Card[]>;

    countdownTime: string;
    time1$: Observable<Time>;
    time2$: Observable<Time>;
    datePipe: any;
    featuredPosts$: Observable<FeaturedPost[]>;
    headerbar: any;
    footerbar: any;
    videoURL: any;

    constructor(
      private countdownService: CountdownService,
      private cardService: AdminCardService,
      private adsService: AdminAdsService,
      private featuredPostService: AdminFeaturedPostService,
      private settingsService: AdminSettingsService,
      public sanitizer: DomSanitizer,
    ) {

    }

    ngOnInit() {
        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
            });

        // Page elements
        this.cards$ = this.cardService.getAllCards();
        this.featuredPosts$ = this.featuredPostService.getAllPosts();
        this.settingsService.getVideoURL()
            .subscribe((dailyVideo) => {
                return this.videoURL = this.sanitizer.bypassSecurityTrustResourceUrl(dailyVideo.videoURL);
            });

        this.countdownService.getCountdown()
            .subscribe((countdown) => {
                const newDate = Date.parse(countdown.date);
                this.time1$ = this.countdownService.timer(new Date(countdown.date.toDate()));
                // To put Date in manually.
                // this.time1$ = this.countdownService.timer(new Date('May 18, 2019 00:00:00'));
            });


    }

}
