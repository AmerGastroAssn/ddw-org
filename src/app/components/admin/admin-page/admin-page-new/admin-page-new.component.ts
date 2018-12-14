import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { User } from '../../../../models/User';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { PagesCardService } from '../../../../services/pages-card.service';
import { CallToAction } from '../../admin-content-section/models/call-to-action';
import { TextSection } from '../../admin-content-section/models/text-section';
import { CallToActionService } from '../../admin-content-section/services/call-to-action.service';
import { TextSectionService } from '../../admin-content-section/services/text-section.service';

@Component({
    selector: 'ddw-admin-page-new',
    templateUrl: './admin-page-new.component.html',
    styleUrls: ['./admin-page-new.component.css']
})
export class AdminPageNewComponent implements OnInit, OnDestroy {
    newPageForm: FormGroup;
    user: User;
    page: Page;
    pages$: Observable<Page[]>;
    title: string;
    author: string;
    date: number;
    photoURL: string;
    bannerPhotoURL: string;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    url: string;
    extURL: string;
    isExtURL: boolean;
    sortOrder: number;
    hasCalendar: boolean;
    calendarTitle: string;
    calendar$: Observable<Calendar[]>;
    disableAdminOnNew: boolean;
    metaDesc: string;
    hasCards: boolean;
    cardOption1: string;
    cardOption2: string;
    cardOption3: string;
    cardSectionTitle: string;
    textSections$: Observable<TextSection[]>;
    cta$: Observable<CallToAction[]>;
    contentSectionTop: string;
    contentSectionBottom: string;
    callToAction: string;
    pageCards$: Observable<Card[]>;
    isHovering: boolean;
    isInvalid: boolean;
    value: any;
    bsConfig: Partial<BsDatepickerConfig>;
    isExtURLPage: boolean;
    currentDate: Date;
    // Form Grandchildren pages
    isGrandchildPage: boolean;
    grandchildURL: string;
    hidden: boolean;
    registerPages$: Observable<Page[]>;
    newsPages$: Observable<Page[]>;
    exhibitPages$: Observable<Page[]>;
    edPages$: Observable<Page[]>;
    attendeePages$: Observable<Page[]>;
    presPages$: Observable<Page[]>;
    invalidTitle: EventEmitter<boolean> = new EventEmitter();
    titleNotValid: boolean;

    CkeditorConfig = {
        allowedContent: true,
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
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
      private authService: AuthService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private adminCalendarService: AdminCalendarService,
      private pagesCardService: PagesCardService,
      private textSectionService: TextSectionService,
      private ctaService: CallToActionService,
    ) {
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            }
        });

        this.uid = this.afs.createId();
        this.user = this.authService.getProfile();
        this.currentDate = new Date();

        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm a',
              placeholder: this.currentDate,
          });
    }

    // For Form Validations
    get f() {
        return this.newPageForm.controls;
    }

    ngOnInit() {
        // Gets Page Categories for Grandchild page selection.
        this.registerPages$ = this.adminPageService.getAllRegisterPages();
        this.newsPages$ = this.adminPageService.getAllNewsPages();
        this.exhibitPages$ = this.adminPageService.getAllExhibitorPages();
        this.edPages$ = this.adminPageService.getAllEducationPages();
        this.attendeePages$ = this.adminPageService.getAllAttendeePages();
        this.presPages$ = this.adminPageService.getAllPresenterPages();

        // Get Calendar Titles
        this.calendar$ = this.adminCalendarService.getAllCalendars();
        // Page Cards:
        this.pageCards$ = this.pagesCardService.getAllPageCards();
        this.pages$ = this.adminPageService.getAllPages();

        // Content Sections:
        this.textSections$ = this.textSectionService.getAllTextSections();
        this.cta$ = this.ctaService.getAllCtas();

          // Form:
          this.newPageForm = this.fb.group({

              title: ['', Validators.required],
              body: [''],
              author: ['' || this.user.email],
              date: ['' || this.currentDate, Validators.required],
              photoURL: [''],
              bannerPhotoURL: ['' || 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg'],
              category: ['', Validators.required],
              published: ['' || false],
              template: ['' || 'Full Width'],
              url: [''],
              extURL: [''],
              isExtURL: ['' || false],
              sortOrder: ['' || 1],
              hasCalendar: [''],
              calendarTitle: [''],
              isGrandchildPage: ['' || false],
              grandchildURL: [''],
              hidden: ['' || false],
              metaDesc: [''],
              hasCards: ['' || false],
              cardOption1: [''],
              cardOption2: [''],
              cardOption3: [''],
              cardSectionTitle: [''],
              contentSectionTop: ['', Validators.required],
              contentSectionBottom: [''],
              callToAction: [''],
          });

        this.title = this.newPageForm.value.title;
        this.body = this.newPageForm.value.body;
        this.author = this.newPageForm.value.author;
        this.date = this.newPageForm.value.date;
        this.photoURL = this.newPageForm.value.photoURL;
        this.bannerPhotoURL = this.newPageForm.value.bannerPhotoURL;
        this.category = this.newPageForm.value.category;
        this.published = this.newPageForm.value.published;
        this.template = this.newPageForm.value.template;
        this.extURL = this.newPageForm.value.extURL;
        this.isExtURL = this.newPageForm.value.isExtURL;
        this.sortOrder = this.newPageForm.value.sortOrder;
        this.hasCalendar = this.newPageForm.value.hasCalendar;
        this.calendarTitle = this.newPageForm.value.calendarTitle;
        this.isGrandchildPage = this.newPageForm.value.isGrandchildPage;
        this.grandchildURL = this.newPageForm.value.grandchildURL;
        this.hidden = this.newPageForm.value.hidden;
        this.metaDesc = this.newPageForm.value.metaDesc;
        this.hasCards = this.newPageForm.value.hasCards;
        this.cardOption1 = this.newPageForm.value.cardOption1;
        this.cardOption2 = this.newPageForm.value.cardOption2;
        this.cardOption3 = this.newPageForm.value.cardOption3;
        this.cardSectionTitle = this.newPageForm.value.cardSectionTitle;
        this.contentSectionTop = this.newPageForm.value.contentSectionTop;
        this.contentSectionBottom = this.newPageForm.value.contentSectionBottom;
        this.callToAction = this.newPageForm.value.callToAction;
    }

    ngOnDestroy() {

    }

    onAddNewPage(formData) {
        if (!this.newPageForm.valid) {
            this.sbAlert.open('Missing at least one input, page was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.adminPageService.setPage(formData)
                .then(() => {
                    console.log(formData);
                    this.newPageForm.reset();
                    this.sbAlert.open('New Page created!', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .catch((error) => console.log(error));
        }
    }

    isExtURLToggle() {
        this.isExtURL = !this.isExtURL;
    }

    toggleHasCalendar() {
        this.hasCalendar = !this.hasCalendar;
    }

    toggleIsGrandchildPage() {
        this.isGrandchildPage = !this.isGrandchildPage;
    }

    toggleHasCards() {
        this.hasCards = !this.hasCards;
    }


}
