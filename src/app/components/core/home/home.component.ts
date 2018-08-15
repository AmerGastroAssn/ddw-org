import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Ads } from '../../../models/Ads';
import { Card } from '../../../models/Card';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminCardService } from '../../../services/admin-card.service';
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
    ads$: Ads;
    headerbar: string;

    constructor(
      private countdownService: CountdownService,
      private cardService: AdminCardService,
      private meta: Meta,
      private adsService: AdminAdsService,
    ) {
        // this.meta.addTag({ name: 'description', content: 'How to use Angular 4 meta service' });
        // this.meta.addTag({ name: 'author', content: 'talkingdotnet' });
        // this.meta.addTag({ name: 'keywords', content: 'Angular, Meta Service' });
    }

    ngOnInit() {
        this.adsService.getAds()
            .subscribe((ads) => {
                return this.ads$ = ads;
            });

        this.cards$ = this.cardService.getAllCards();

        this.countdownService.getCountdown()
            .subscribe((countdown) => {
                const newDate = Date.parse(countdown.date);
                this.time1$ = this.countdownService.timer(new Date(countdown.date.toDate()));

            });

        // To put Date in manually.
        // this.time1$ = this.countdownService.timer(new Date('May 18, 2019 00:00:00'));
    }

}
