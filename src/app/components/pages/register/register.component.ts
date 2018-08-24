import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Calendar } from '../../../models/Calendar';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { AdminCalendarService } from '../../../services/admin-calendar.service';
import { AdminCardService } from '../../../services/admin-card.service';
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
