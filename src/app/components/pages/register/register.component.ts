import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { PageService } from '../../../services/page.service';
declare var $: any;

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
        // Removes Navbar styling
        // $(document).ready(function () {
        //     $(window).scroll(function () {
        //           const navLinks    = $('li.nav-item > a'),
        //                 navDropdown = $('a.dropdown-item'),
        //                 navbar      = $('.navbar');
        //
        //           navbar.removeClass('navbarWhite');
        //           navLinks.removeClass('linksDark');
        //           navDropdown.removeClass('linksDark');
        //       }
        //     )
        // };
    }


    ngOnInit() {
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (this.page && meta) {
                    this.meta.addTags([
                        { name: 'description', content: meta.metaDesc },
                        { name: 'author', content: this.page.author },
                        { name: 'keywords', content: meta.metaKeywords },
                        { property: 'og:url', content: 'https://ddw.org' },
                        {
                            property: 'og:title',
                            content: `${this.page} - Digestive Digest Week®`
                        },
                        { property: 'og:description', content: meta.metaDesc },
                        { property: 'og:image', content: meta.metaImageURL },
                    ], true);
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

}
