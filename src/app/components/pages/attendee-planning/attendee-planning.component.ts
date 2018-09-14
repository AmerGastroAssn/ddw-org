import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
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
    selector: 'ddw-attendee-planning',
    templateUrl: './attendee-planning.component.html',
    styleUrls: ['./attendee-planning.component.css']
})
export class AttendeePlanningComponent implements OnInit {
    page: Page;
    url: string;
    cards$: Observable<Card[]>;
    calendar$: Observable<Calendar[]>;
    calendarTitle: string;
    tab1: string;
    tab2: string;
    tab3: string;
    tab4: string;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private meta: Meta,
      private metaService: AdminMetaService,
      private titleService: Title
    ) {
    }

    ngOnInit() {
        this.cards$ = this.cardService.getAllCards();

        // Gets $key which is a Slug
        this.route.params.switchMap((params: Params) => {
            this.url = params['id'];

            return this.adminPageService.getPage(this.url);
        })
            .subscribe((page) => {
                this.page = page;
                // For page title
                this.titleService.setTitle(`${this.page.title} - DDW Website`);
                // Meta tags
                this.metaService.getMeta()
                    .subscribe((meta) => {
                        if (this.page && meta) {
                            this.meta.updateTag({ name: 'description', content: meta.metaDesc });
                            this.meta.updateTag({ name: 'author', content: this.page.author });
                            this.meta.updateTag({ name: 'keywords', content: meta.metaKeywords });
                            this.meta.updateTag({ property: 'og:url', content: `http://ddw.org/${this.page.slug}` });
                            this.meta.updateTag({
                                property: 'og:title',
                                content: `${this.page.title} - Digestive Digest Week®`
                            });
                            this.meta.updateTag({ property: 'og:site_name', content: `Digestive Digest Week®` });
                            this.meta.updateTag({ property: 'og:see_also', content: `http://ddw.org/home` });
                            this.meta.updateTag({ property: 'og:description', content: meta.metaDesc });
                            this.meta.updateTag({
                                property: 'og:image',
                                content: this.page.photoURL || meta.metaImageURL
                            });
                            this.meta.updateTag({ itemprop: 'name', content: `http://ddw.org/${this.page.slug}` });
                            this.meta.updateTag({ itemprop: 'description', content: meta.metaDesc });
                            this.meta.updateTag({ itemprop: 'image', content: this.page.photoURL });
                            this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
                            this.meta.updateTag({ name: 'twitter:creator', content: '@DDWMeeting' });
                            this.meta.updateTag({ name: 'twitter:url', content: `http://ddw.org/${this.page.slug}` });
                            this.meta.updateTag({ name: 'twitter:site', content: '@DDWMeeting' });
                            this.meta.updateTag({ name: 'twitter:title', content: this.page.title });
                            this.meta.updateTag({ name: 'twitter:description', content: meta.metaDesc });
                            this.meta.updateTag({
                                name: 'twitter:image',
                                content: this.page.photoURL || meta.metaImageURL
                            });
                        }
                    });

                // Calendar
                if (this.page.hasCalendar) {
                    this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);
                }
            });
    }
}
