import { AfterContentInit, Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminCardService } from '../../../../services/admin-card.service';
import { AdminMetaService } from '../../../../services/admin-meta.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { PagesCardService } from '../../../../services/pages-card.service';
import { CallToAction } from '../../admin-content-section/models/call-to-action';
import { CallToActionService } from '../../admin-content-section/services/call-to-action.service';
import { TextSectionService } from '../../admin-content-section/services/text-section.service';

@Component({
    selector: 'ddw-admin-page-details',
    templateUrl: './admin-page-details.component.html',
    styleUrls: ['./admin-page-details.component.css'],
})
export class AdminPageDetailsComponent implements OnInit, AfterContentInit {
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
    widgetSnippet: any;
    ingoImage = `https://firebasestorage.googleapis.com/v0/b/ddw-org-dev.appspot.com/o/images%2F2019%2F1549405081565_ingo_image.png?alt=media&token=7032f2c2-d1c2-4dc5-922d-851a74baeb3a`;

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
      private metaService: AdminMetaService,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];


        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;

                this.metaService.getMeta()
                    .subscribe((meta) => {
                        if (this.page && meta) {
                            // Widget Snippet
                            this.widgetSnippet = meta.widgetSnippet;
                            console.log('this.widgetsnippet', this.widgetSnippet);
                        }
                    });

                // Calendar
                if (this.page.hasCalendar) {
                    this.calendar$ = this.adminCalendarService.getCalendarByTitle(this.page.calendarTitle);

                    this.calendar$.subscribe((calendar) => {
                        this.calendar = calendar[0];
                        // console.log(`this.calendar`, this.calendar);
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

    ngAfterContentInit(): void {
    }

    onDeletePage() {
        this.adminPageService.deletePage(this.page.uid);
    }


}
