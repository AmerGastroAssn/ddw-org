import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminCardService } from '../../../../services/admin-card.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { PagesCardService } from '../../../../services/pages-card.service';

@Component({
    selector: 'ddw-admin-page-details',
    templateUrl: './admin-page-details.component.html',
    styleUrls: ['./admin-page-details.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(600)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(600, style({ opacity: 0 })))
        ])
    ]
})
export class AdminPageDetailsComponent implements OnInit {
    id: string;
    page: Page;
    uid: string;
    calendar$: Observable<Calendar[]>;
    calendar: Calendar;
    calendarTitle: string;
    pageCard1: Card;
    pageCard2: Card;
    pageCard3: Card;
    month: string;
    month2: string;
    month3: string;
    month4: string;

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private pagesCardService: PagesCardService,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;

                // Calendar
                if (this.page.hasCalendar) {
                    this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);
                }

                // Page Cards:
                if (this.page.hasCards) {
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

        // this.cards$ = this.cardService.getAllCards();

    }

    onDeletePage() {
        this.adminPageService.deletePage(this.page.uid);
    }

}
