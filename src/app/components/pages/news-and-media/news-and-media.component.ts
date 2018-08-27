import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { PressRelease } from '../../../models/PressRelease';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { AdminPressReleaseService } from '../../../services/admin-press-release.service';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-news-and-media',
    templateUrl: './news-and-media.component.html',
    styleUrls: ['./news-and-media.component.css']
})
export class NewsAndMediaComponent implements OnInit {
    page: Page;
    url: string;
    cards$: Observable<Card[]>;
    calendar$: Observable<Calendar[]>;
    calendarTitle: string;
    hasCalendar: boolean;
    pressRelease$: Observable<PressRelease[]>;
    banner: string;
    pageTitle: string;
    newsTitle: string;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private adminPressReleaseService: AdminPressReleaseService,
    ) {
        this.banner = 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg';
        this.pageTitle = 'Press Releases';
        this.newsTitle = 'News & Media';
    }

    ngOnInit() {
        this.cards$ = this.cardService.getAllCards();


        // Gets $key which is a Slug
        this.route.params.switchMap((params: Params) => {
            this.url = params['id'];

            return this.adminPageService.getPage(this.url);
        })
            .subscribe((page) => {
                if (page.title === 'Press Releases') {
                    this.pressRelease$ = this.pageService.getPublishedPressReleases();
                    this.page = null;
                } else {
                    this.page = page;
                }
                // Calendar
                if (page.hasCalendar) {
                    this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);
                } else {
                    this.calendar$ = null;
                }
            });
    }
}
