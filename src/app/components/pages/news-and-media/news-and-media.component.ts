import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { PressRelease } from '../../../models/PressRelease';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { AdminPressReleaseService } from '../../../services/admin-press-release.service';
import { PageService } from '../../../services/page.service';
import { PagesCardService } from '../../../services/pages-card.service';


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
    pressReleases$: Observable<PressRelease[]>;
    pressReleases: PressRelease[];
    banner: string;
    pageTitle: string;
    newsTitle: string;
    pageCard1: Card;
    pageCard2: Card;
    pageCard3: Card;
    headerbar: any;
    footerbar: any;


    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private adminPressReleaseService: AdminPressReleaseService,
      private meta: Meta,
      private metaService: AdminMetaService,
      private titleService: Title,
      private pagesCardService: PagesCardService,
      private adsService: AdminAdsService,
    ) {
        this.banner = 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg';
        this.pageTitle = 'Press Releases';
        this.newsTitle = 'News';
    }

    ngOnInit() {
        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
                this.headerbar = ads.headerbar;
            });

        this.cards$ = this.cardService.getAllCards();


        // Gets $key which is a Slug
        this.route.params.switchMap((params: Params) => {
            this.url = params['id'];

            return this.adminPageService.getPage(this.url);
        })
            .subscribe((page) => {
                if (page) {
                    if (page.title === 'Press Releases') {
                        this.pageService.getPublishedPressReleases()
                            .subscribe((prs) => {
                                // Lists press releases in Decending order.
                                this.pressReleases = _.orderBy(prs, ['publishOn'], ['desc']);
                            });
                        this.page = null;
                    } else {
                        this.page = page;
                        // For page title
                        this.titleService.setTitle(`${this.page.title} - DDW Website`);
                        // Meta tags
                        this.metaService.getMeta()
                            .subscribe((meta) => {
                                if (this.page && meta) {
                                    this.meta.updateTag({
                                        name: 'description',
                                        content: this.page.metaDesc || meta.metaDesc
                                    });
                                    this.meta.updateTag({ name: 'author', content: this.page.author });
                                    this.meta.updateTag({ name: 'keywords', content: meta.metaKeywords });
                                    this.meta.updateTag({
                                        property: 'og:url',
                                        content: `http://ddw.org/${this.page.slug}`
                                    });
                                    this.meta.updateTag({
                                        property: 'og:title',
                                        content: `${this.page.title} - Digestive Digest Week®`
                                    });
                                    this.meta.updateTag({
                                        property: 'og:site_name',
                                        content: `Digestive Digest Week®`
                                    });
                                    this.meta.updateTag({ property: 'og:see_also', content: `http://ddw.org/home` });
                                    this.meta.updateTag({
                                        property: 'og:description',
                                        content: this.page.metaDesc || meta.metaDesc
                                    });
                                    this.meta.updateTag({
                                        property: 'og:image',
                                        content: this.page.photoURL || meta.metaImageURL
                                    });
                                    this.meta.updateTag({
                                        itemprop: 'name',
                                        content: `http://ddw.org/${this.page.slug}`
                                    });
                                    this.meta.updateTag({
                                        itemprop: 'description',
                                        content: this.page.metaDesc || meta.metaDesc
                                    });
                                    this.meta.updateTag({ itemprop: 'image', content: this.page.photoURL });
                                    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
                                    this.meta.updateTag({ name: 'twitter:creator', content: '@DDWMeeting' });
                                    this.meta.updateTag({
                                        name: 'twitter:url',
                                        content: `http://ddw.org/${this.page.slug}`
                                    });
                                    this.meta.updateTag({ name: 'twitter:title', content: this.page.title });
                                    this.meta.updateTag({ name: 'twitter:site', content: '@DDWMeeting' });
                                    this.meta.updateTag({
                                        name: 'twitter:description',
                                        content: this.page.metaDesc || meta.metaDesc
                                    });
                                    this.meta.updateTag({
                                        name: 'twitter:image',
                                        content: this.page.photoURL || meta.metaImageURL
                                    });
                                }
                            });
                    }
                    // Calendar
                    if (page.hasCalendar) {
                        this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);
                    } else {
                        this.calendar$ = null;
                    }

                    // Page Cards:
                    if (page.hasCards) {
                        this.pagesCardService.getPageCard(this.page.cardOption1)
                            .subscribe((card) => {
                                this.pageCard1 = card;
                            });
                        this.pagesCardService.getPageCard(this.page.cardOption2)
                            .subscribe((card) => {
                                this.pageCard2 = card;
                            });
                        this.pagesCardService.getPageCard(this.page.cardOption3)
                            .subscribe((card) => {
                                this.pageCard3 = card;
                            });
                    }
                }
            });
    }
}
