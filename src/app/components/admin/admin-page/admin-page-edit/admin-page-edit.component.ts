import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { BsDatepickerConfig, BsDatepickerDirective } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { Calendar } from '../../../../models/Calendar';
import { Card } from '../../../../models/Card';
import { Page } from '../../../../models/Page';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { AdminImageService } from '../../../../services/admin-image.service';
import { AdminPageService } from '../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { PagesCardService } from '../../../../services/pages-card.service';

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
    // Image upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
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


    uploadImage(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name}`;
        const fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        // The file's download URL
        this.task.snapshotChanges().pipe(
          finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe((imageURL) => {
                  this.imageService.setImage(imageURL, file.name)
                      .then(() => {
                          this.sbAlert.open('Image has been added!', 'Dismiss', {
                              duration: 3000,
                              verticalPosition: 'bottom',
                              panelClass: ['snackbar-success']
                          });
                      })
                      .catch((error) => console.log('Problem sending image to service', error));
              });
          })
        )
            .subscribe();
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;
        this.pageCards$ = this.pagesCardService.getAllPageCards();
        // Get Calendar Titles
        this.calendars$ = this.adminCalendarService.getAllCalendars();
        // this.adminCalendarService.getAllCalendars()
        //     .subscribe((calArr) => {
        //         this.calendars = _.orderBy(calArr, ['title'], ['asc']);
        //     });

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get Page
        this.adminPageService.getPage(this.uid).subscribe((page) => {
            if (page !== null) {
                this.page = page;
                const newURL: string = this.adminPageService.string_to_slug(page.title);

                // Form:
                this.editPageForm = this.fb.group({
                    uid: [page.uid],
                    title: [this.page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.page.body],
                    author: [this.page.author],
                    date: [page.date || ''],
                    bannerPhotoURL: [page.bannerPhotoURL || 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg'],
                    photoURL: [this.page.photoURL || ''],
                    category: [this.page.category, Validators.required],
                    published: [this.page.published || false],
                    template: [this.page.template],
                    url: [newURL, Validators.required],
                    extURL: [this.page.extURL],
                    isExtURL: [this.page.isExtURL],
                    sortOrder: [this.page.sortOrder],
                    hasCalendar: [this.page.hasCalendar],
                    calendarTitle: [page.calendarTitle],
                    isGrandchildPage: [this.page.isGrandchildPage],
                    grandchildURL: [this.page.grandchildURL],
                    hidden: [this.page.hidden || false],
                    metaDesc: [this.page.metaDesc || ''],
                    hasCards: [page.hasCards || false],
                    cardOption1: [this.page.cardOption1],
                    cardOption2: [this.page.cardOption2],
                    cardOption3: [this.page.cardOption3],
                    cardSectionTitle: [this.page.cardSectionTitle],
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


            }

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
        this.datepicker.hide();
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
