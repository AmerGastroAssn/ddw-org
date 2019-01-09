import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminCardService } from '../../../../services/admin-card.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { PagesCardService } from '../../../../services/pages-card.service';
import { CallToAction } from '../../admin-content-section/models/call-to-action';
import { CallToActionService } from '../../admin-content-section/services/call-to-action.service';
import { TextSectionService } from '../../admin-content-section/services/text-section.service';

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
    // Content Sections
    cta: CallToAction;
    videoUrl: any;
    imageUrl: any;
    ctaBody: any;
    tsTopBody: any;
    tsBottomBody: any;

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
      private adminCalendarService: AdminCalendarService,
      private pagesCardService: PagesCardService,
      private ctaService: CallToActionService,
      private tsService: TextSectionService,
      private sanitizer: DomSanitizer,
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

                    this.calendar$.subscribe((calendar) => {
                        this.calendar = calendar[0];
                        console.log(`this.calendar`, this.calendar);
                        // Date 1
                        if (this.calendar.date1) {
                            const date1AsString = this.calendar.date1.toDate().toDateString();
                            if (date1AsString.includes('Jan')) {
                                this.month = 'Jan.';
                            } else if (date1AsString.includes('Feb')) {
                                this.month = 'Feb.';
                            } else if (date1AsString.includes('Mar')) {
                                this.month = 'March';
                            } else if (date1AsString.includes('Apr')) {
                                this.month = 'April';
                            } else if (date1AsString.includes('May')) {
                                this.month = 'May';
                            } else if (date1AsString.includes('Jun')) {
                                this.month = 'June';
                            } else if (date1AsString.includes('Jul')) {
                                this.month = 'July';
                            } else if (date1AsString.includes('Aug')) {
                                this.month = 'Aug.';
                            } else if (date1AsString.includes('Sep')) {
                                this.month = 'Sep.';
                            } else if (date1AsString.includes('Oct')) {
                                this.month = 'Oct.';
                            } else if (date1AsString.includes('Nov')) {
                                this.month = 'Nov.';
                            } else if (date1AsString.includes('Dec')) {
                                this.month = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 2
                        if (this.calendar.date2) {
                            const date2AsString = this.calendar.date2.toDate().toDateString();
                            if (date2AsString.includes('Jan')) {
                                this.month2 = 'Jan.';
                            } else if (date2AsString.includes('Feb')) {
                                this.month2 = 'Feb.';
                            } else if (date2AsString.includes('Mar')) {
                                this.month2 = 'March';
                            } else if (date2AsString.includes('Apr')) {
                                this.month2 = 'April';
                            } else if (date2AsString.includes('May')) {
                                this.month2 = 'May';
                            } else if (date2AsString.includes('Jun')) {
                                this.month2 = 'June';
                            } else if (date2AsString.includes('Jul')) {
                                this.month2 = 'July';
                            } else if (date2AsString.includes('Aug')) {
                                this.month2 = 'Aug.';
                            } else if (date2AsString.includes('Sep')) {
                                this.month2 = 'Sep.';
                            } else if (date2AsString.includes('Oct')) {
                                this.month2 = 'Oct.';
                            } else if (date2AsString.includes('Nov')) {
                                this.month2 = 'Nov.';
                            } else if (date2AsString.includes('Dec')) {
                                this.month2 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 3
                        if (this.calendar.date3) {
                            const date3AsString = this.calendar.date3.toDate().toDateString();
                            if (date3AsString.includes('Jan')) {
                                this.month3 = 'Jan.';
                            } else if (date3AsString.includes('Feb')) {
                                this.month3 = 'Feb.';
                            } else if (date3AsString.includes('Mar')) {
                                this.month3 = 'March';
                            } else if (date3AsString.includes('Apr')) {
                                this.month3 = 'April';
                            } else if (date3AsString.includes('May')) {
                                this.month3 = 'May';
                            } else if (date3AsString.includes('Jun')) {
                                this.month3 = 'June';
                            } else if (date3AsString.includes('Jul')) {
                                this.month3 = 'July';
                            } else if (date3AsString.includes('Aug')) {
                                this.month3 = 'Aug.';
                            } else if (date3AsString.includes('Sep')) {
                                this.month3 = 'Sep.';
                            } else if (date3AsString.includes('Oct')) {
                                this.month3 = 'Oct.';
                            } else if (date3AsString.includes('Nov')) {
                                this.month3 = 'Nov.';
                            } else if (date3AsString.includes('Dec')) {
                                this.month3 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }


                        // Date 4
                        if (this.calendar.date4) {
                            const date4AsString = this.calendar.date4.toDate().toDateString();
                            if (date4AsString.includes('Jan')) {
                                this.month4 = 'Jan.';
                            } else if (date4AsString.includes('Feb')) {
                                this.month4 = 'Feb.';
                            } else if (date4AsString.includes('Mar')) {
                                this.month4 = 'March';
                            } else if (date4AsString.includes('Apr')) {
                                this.month4 = 'April';
                            } else if (date4AsString.includes('May')) {
                                this.month4 = 'May';
                            } else if (date4AsString.includes('Jun')) {
                                this.month4 = 'June';
                            } else if (date4AsString.includes('Jul')) {
                                this.month4 = 'July';
                            } else if (date4AsString.includes('Aug')) {
                                this.month4 = 'Aug.';
                            } else if (date4AsString.includes('Sep')) {
                                this.month4 = 'Sep.';
                            } else if (date4AsString.includes('Oct')) {
                                this.month4 = 'Oct.';
                            } else if (date4AsString.includes('Nov')) {
                                this.month4 = 'Nov.';
                            } else if (date4AsString.includes('Dec')) {
                                this.month4 = 'Dec.';
                            } else {
                                return of(null);
                            }
                        }
                    });
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

            // Content Sections
            if (this.page.contentSectionTop) {
                this.tsService.getTextSection(this.page.contentSectionTop)
                    .subscribe((section) => {
                        if (section.body) {
                            this.tsTopBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                        }
                    });
            }
            if (this.page.contentSectionBottom) {
                this.tsService.getTextSection(this.page.contentSectionBottom)
                    .subscribe((section) => {
                        if (section.body) {
                            this.tsBottomBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                        }
                    });
            }
            if (this.page.callToAction) {
                this.ctaService.getCta(this.page.callToAction)
                    .subscribe((cta) => {
                        this.cta = cta;
                        if (cta.imageUrl) {
                            this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.imageUrl);
                        }
                        if (cta.videoUrl) {
                            this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(cta.videoUrl);
                        }
                        if (cta.body) {
                            this.ctaBody = this.sanitizer.bypassSecurityTrustHtml(cta.body);
                        }
                    });
            }



        }); // END


    }

    onDeletePage() {
        this.adminPageService.deletePage(this.page.uid);
    }


}
