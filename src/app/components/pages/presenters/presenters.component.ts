import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-presenters',
    templateUrl: './presenters.component.html',
    styleUrls: ['./presenters.component.css']
})
export class PresentersComponent implements OnInit, OnDestroy {
    page: Page;
    url: string;
    cards$: Observable<Card[]>;
    calendar$: Observable<Calendar[]>;
    calendarTitle: string;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private meta: Meta,
      private metaService: AdminMetaService,
    ) {
    }

    ngOnInit() {
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (this.page && meta) {
                    return this.meta.addTag({ name: 'description', content: meta.metaDesc }),
                      this.meta.addTag({ name: 'author', content: this.page.author }),
                      this.meta.addTag({ name: 'keywords', content: meta.metaKeywords }),
                      this.meta.addTag({ property: 'og:url', content: 'https://ddw.org' }),
                      this.meta.addTag({
                          property: 'og:title',
                          content: `${this.page.title} - Digestive Digest Week®`
                      }),
                      this.meta.addTag({ property: 'og:description', content: meta.metaDesc }),
                      this.meta.addTag({ property: 'og:image', content: this.page.photoURL });
                }
            });
        this.cards$ = this.cardService.getAllCards();


        // Gets $key which is a Slug
        this.route.params.switchMap((params: Params) => {
            this.url = params['id'];

            return this.adminPageService.getPage(this.url);
        })
            .subscribe((page) => {
                this.page = page;
                // Calendar
                if (this.page.hasCalendar) {
                    this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);
                }
            });

    }

    ngOnDestroy() {
    }
}
