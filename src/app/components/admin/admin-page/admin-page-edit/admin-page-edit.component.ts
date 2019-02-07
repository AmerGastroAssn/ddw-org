import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage } from 'angularfire2/storage';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminImageService } from '../../../../services/admin-image.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { PagesCardService } from '../../../../services/pages-card.service';
import { CallToAction } from '../../admin-content-section/models/call-to-action';
import { TextSection } from '../../admin-content-section/models/text-section';
import { CallToActionService } from '../../admin-content-section/services/call-to-action.service';
import { TextSectionService } from '../../admin-content-section/services/text-section.service';

@Component({
    selector: 'ddw-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css'],
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
              animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class AdminPageEditComponent implements OnInit {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
    page: Page;
    editPageForm: FormGroup;
    $key: string;
    title: string;
    author: string;
    date: any;
    photoURL: any;
    bannerPhotoURL: any;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    url: string;
    extURL: string;
    isExtURL: boolean;
    isExtURLPage: boolean;
    sortOrder: number;
    hasCalendar: boolean;
    calendarTitle: string;
    calendars$: Observable<Calendar[]>;
    calendars: Calendar[];
    disableAdminOnEdit: boolean;
    metaDesc: string;
    hasCards: boolean;
    cardOption1: string;
    cardOption2: string;
    cardOption3: string;
    cardSectionTitle: string;
    pageCards$: Observable<Card[]>;
    textSections$: Observable<TextSection[]>;
    cta$: Observable<CallToAction[]>;
    contentSectionTop: string;
    contentSectionBottom: string;
    callToAction: string;
    showWidgetSnippet: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;
    togglePagePreview = false;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;
    isNewsCategory: boolean;
    // Form Grandchildren pages
    isGrandchildPage: boolean;
    grandchildURL: string;
    hidden: boolean;
    pages$: Observable<Page[]>;
    // Content Sections
    cta: CallToAction;
    videoUrl: any;
    imageUrl: any;
    ctaBody: any;
    tsTopBody: any;
    tsBottomBody: any;
    // Cards:
    pageCard1: Card;
    pageCard2: Card;
    pageCard3: Card;

    CkeditorConfig = {
        allowedContent: true,
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id,rel];*(*);*{*}',
        extraPlugins: 'codesnippet',
        codeSnippet_theme: 'monokai_sublime',
    };


    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private storage: AngularFireStorage,
      private sbAlert: MatSnackBar,
      private sanitizer: DomSanitizer,
      private authService: AuthService,
      private adminCalendarService: AdminCalendarService,
      private pagesCardService: PagesCardService,
      private imageService: AdminImageService,
      private textSectionService: TextSectionService,
      private ctaService: CallToActionService,
      private tsService: TextSectionService,
    ) {

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm',
              placeholder: new Date()
          });

        // Get Current Author
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {

            }
        });
    }

    // For Form Validations
    get f() {
        return this.editPageForm.controls;
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        this.pageCards$ = this.pagesCardService.getAllPageCards();
        this.calendars$ = this.adminCalendarService.getAllCalendars();
        this.textSections$ = this.textSectionService.getAllTextSections();
        this.cta$ = this.ctaService.getAllCtas();

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get Page
        this.adminPageService.getPage(this.uid).subscribe((page) => {
            if (page !== null) {
                this.page = page;
                const newURL: string = this.adminPageService.string_to_slug(page.title);

                // Form:
                this.editPageForm = this.fb.group({
                    uid: [this.page.uid],
                    title: [this.page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.page.body],
                    author: [this.page.author],
                    date: [this.page.date || ''],
                    bannerPhotoURL: [this.page.bannerPhotoURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg'],
                    photoURL: [this.page.photoURL || ''],
                    category: [this.page.category, Validators.required],
                    published: [this.page.published || false],
                    template: [this.page.template],
                    url: [newURL, Validators.required],
                    extURL: [this.page.extURL],
                    isExtURL: [this.page.isExtURL],
                    sortOrder: [this.page.sortOrder],
                    hasCalendar: [this.page.hasCalendar],
                    calendarTitle: [this.page.calendarTitle],
                    isGrandchildPage: [this.page.isGrandchildPage],
                    grandchildURL: [this.page.grandchildURL],
                    hidden: [this.page.hidden || false],
                    metaDesc: [this.page.metaDesc || ''],
                    hasCards: [this.page.hasCards || false],
                    cardOption1: [this.page.cardOption1],
                    cardOption2: [this.page.cardOption2],
                    cardOption3: [this.page.cardOption3],
                    cardSectionTitle: [this.page.cardSectionTitle],
                    contentSectionTop: [this.page.contentSectionTop || ''],
                    contentSectionBottom: [this.page.contentSectionBottom || ''],
                    callToAction: [this.page.callToAction || ''],
                    showWidgetSnippet: [this.page.showWidgetSnippet || false],
                });

                this.uid = this.editPageForm.value.uid;
                this.title = this.editPageForm.value.title;
                this.body = this.editPageForm.value.body;
                this.author = this.editPageForm.value.author;
                this.date = this.editPageForm.value.date.valueOf();
                this.bannerPhotoURL = this.editPageForm.value.bannerPhotoURL;
                this.photoURL = this.editPageForm.value.photoURL;
                this.category = this.editPageForm.value.category;
                this.published = this.editPageForm.value.published;
                this.template = this.editPageForm.value.template;
                this.url = this.editPageForm.value.url;
                this.extURL = this.editPageForm.value.extURL;
                this.isExtURL = this.editPageForm.value.isExtURL;
                this.sortOrder = this.editPageForm.value.sortOrder;
                this.hasCalendar = this.editPageForm.value.hasCalendar;
                this.calendarTitle = this.editPageForm.value.calendarTitle;
                this.isGrandchildPage = this.editPageForm.value.isGrandchildPage;
                this.grandchildURL = this.editPageForm.value.grandchildURL;
                this.hidden = this.editPageForm.value.hidden;
                this.metaDesc = this.editPageForm.value.metaDesc;
                this.hasCards = this.editPageForm.value.hasCards;
                this.cardOption1 = this.editPageForm.value.cardOption1;
                this.cardOption2 = this.editPageForm.value.cardOption2;
                this.cardOption3 = this.editPageForm.value.cardOption3;
                this.cardSectionTitle = this.editPageForm.value.cardSectionTitle;
                this.contentSectionTop = this.editPageForm.value.contentSectionTop;
                this.contentSectionBottom = this.editPageForm.value.contentSectionBottom;
                this.callToAction = this.editPageForm.value.callToAction;
                this.showWidgetSnippet = this.editPageForm.value.showWidgetSnippet;


                // Content Sections
                if (this.page.contentSectionTop !== '') {
                    this.tsService.getTextSection(this.page.contentSectionTop)
                        .subscribe((section) => {
                            if (section) {
                                this.tsTopBody = this.sanitizer.bypassSecurityTrustHtml(section.body);
                            }
                        });
                }

                if (this.page.contentSectionBottom) {
                    this.tsService.getTextSection(this.page.contentSectionBottom)
                        .subscribe((section) => {
                            if (section) {
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


                // Page Cards (Preview):
                // console.log('something');
                // if (this.page.hasCards) {
                //     console.log('hascards');
                //     this.pagesCardService.getPageCard(this.page.cardOption1)
                //         .subscribe((card) => {
                //             console.log('card1', card);
                //             this.pageCard1 = card;
                //         });
                //     this.pagesCardService.getPageCard(this.page.cardOption2)
                //         .subscribe((card) => {
                //             this.pageCard2 = card;
                //         });
                //     this.pagesCardService.getPageCard(this.page.cardOption3)
                //         .subscribe((card) => {
                //             this.pageCard3 = card;
                //         });
                // }


            } // END this.page

            // Shows only the grandchildren of that section versus all (saves on read/writes).
            switch (page.category) {
                case 'register':
                    this.pages$ = this.adminPageService.getAllRegisterPages();
                    break;
                case 'attendee-planning':
                    this.pages$ = this.adminPageService.getAllAttendeePages();
                    break;
                case 'education':
                    this.pages$ = this.adminPageService.getAllEducationPages();
                    break;
                case 'exhibitor-information':
                    this.pages$ = this.adminPageService.getAllExhibitorPages();
                    break;
                case 'news':
                    this.pages$ = this.adminPageService.getAllNewsPages();
                    break;
                case 'presenters':
                    this.pages$ = this.adminPageService.getAllPresenterPages();
                    break;
                default:
                    this.pages$ = null;
            }
        });


    }

    onUpdatePage(formData) {
        if (!this.editPageForm.valid) {
            this.sbAlert.open('Something went wrong, Page was not created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            console.log('formData', formData);
            this.adminPageService.updatePage(formData, this.page.uid);
            this.editPageForm.reset(this.editPageForm);
            this.sbAlert.open('Page was updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

    @HostListener('window:scroll')
    onScrollEvent() {
        if ('window:scroll') {
            this.datepicker.hide();
        }
    }

    onFileSelection(event) {
        // this.pageService.fileSelection(event);
    }

    onTogglePagePreview() {
        this.togglePagePreview = !this.togglePagePreview;
    }

    isExtURLToggle() {
        this.page.isExtURL = !this.page.isExtURL;
    }

    toggleHasCalendar() {
        this.page.hasCalendar = !this.page.hasCalendar;
    }

    toggleHasCards() {
        this.page.hasCards = !this.page.hasCards;
    }


    toggleIsGrandchildPage() {
        this.page.isGrandchildPage = !this.page.isGrandchildPage;
    }


}
