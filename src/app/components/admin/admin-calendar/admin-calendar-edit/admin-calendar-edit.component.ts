import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CalColumnValues } from '../../../../models/CalColumnValues';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';
import { environment } from '../../../../../environments/environment';


@Component({
    selector: 'ddw-admin-calendar-edit',
    templateUrl: './admin-calendar-edit.component.html',
    styleUrls: ['./admin-calendar-edit.component.css'],
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
export class AdminCalendarEditComponent implements OnInit {
    updateCalForm: FormGroup;
    // @ViewChild('colVF') colVF: NgForm;
    calendar: Calendar;
    calColumnValues: CalColumnValues;

    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: any;
    date2: any;
    date3: any;
    date4: any;
    tab1Date: string;
    tab2Date: string;
    tab3Date: string;
    tab4Date: string;
    title: string;
    displayName: string;
    id: string;
    color = 'primary';
    // bsConfig: Partial<BsDatepickerConfig>;

    column1: string;
    column2: string;
    column3: string;
    column4: string;
    currentDate = new Date();
    date1Value: any;
    date2Value: any;
    date3Value: any;
    date4Value: any;
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;

    constructor(
      private calendarService: AdminCalendarService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private sbAlert: MatSnackBar,
    ) {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        this.mceApiKey = environment.mceApiKey;
        this.mceConfig = {
            height: 700,
            plugins: 'code, codesample, lists, tinymcespellchecker, link, preview, fullscreen, advcode',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'SASS', value: 'sass' },
                { text: 'SCSS', value: 'scss' },
                { text: 'TypeScript', value: 'typescript' },
            ],
            // tslint:disable-next-line:max-line-length
            toolbar: 'undo redo fontsizeselect styleselect bold italic link unlink openLink forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent fullscreen code preview',
            body_id: 'tiny-mce-textarea',
            // tslint:disable-next-line:max-line-length
            content_style: `body{font-family:'Open Sans',Roboto,'Helvetica Neue',sans-serif!important;line-height:2rem!important;font-size:1.2rem!important}a,a:link{color:#2e6da4}a.btn.btn-warning.btn-lg{background-color:#f47700;color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:700;text-decoration:none;padding:.5em 2em;font-size:18px}a.btn.btn-warning.btn-lg:hover{background-color:#feb512;color:#004060;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:400;text-decoration:none;padding:.5em 2em;font-size:18px}
                `,
            content_css: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
        };

        // Edit Calendar:
        this.calendarService.getCalendar(this.id).subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar = calendar;

                this.updateCalForm = this.fb.group({
                    body1: [calendar.body1, Validators.required],
                    body2: [calendar.body2 || ''],
                    body3: [calendar.body3 || ''],
                    body4: [calendar.body4 || ''],
                    date1: [calendar.date1, Validators.required],
                    date2: [calendar.date2 || ''],
                    date3: [calendar.date3 || ''],
                    date4: [calendar.date4 || ''],
                    tab1Date: [calendar.tab1Date || ''],
                    tab2Date: [calendar.tab2Date || ''],
                    tab3Date: [calendar.tab3Date || ''],
                    tab4Date: [calendar.tab4Date || ''],
                    title: [calendar.title, Validators.required],
                    displayName: [calendar.displayName || ''],
                    id: [calendar.id],
                });

                this.title = this.updateCalForm.value.title;
                this.body1 = this.updateCalForm.value.body1;
                this.body2 = this.updateCalForm.value.body2;
                this.body3 = this.updateCalForm.value.body3;
                this.body4 = this.updateCalForm.value.body4;
                this.date1 = this.updateCalForm.value.date1;
                this.date2 = this.updateCalForm.value.date2;
                this.date3 = this.updateCalForm.value.date3;
                this.date4 = this.updateCalForm.value.date4;
                this.tab1Date = this.updateCalForm.value.tab1Date;
                this.tab2Date = this.updateCalForm.value.tab2Date;
                this.tab3Date = this.updateCalForm.value.tab3Date;
                this.tab4Date = this.updateCalForm.value.tab4Date;
                this.displayName = this.updateCalForm.value.displayName;
                this.id = this.updateCalForm.value.id;

            }
        });


    }

    ngOnInit() {

        // Get Event 1
        this.calendarService.getCalendar(this.id)
          .subscribe((calInfo) => {
              this.calendar = calInfo;
          });
        // // Get Column Values
        // this.calendarService.getCalColumnValues()
        //     .subscribe((values) => {
        //         this.calColumnValues = values;
        //     });
    }


    // Reactive Form
    onCalendarUpdate(calendarData) {
        if (!this.updateCalForm.valid) {
            this.sbAlert.open('The Title, Date 1 and Body 1 must be filled out, Event was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.updateCalendar(calendarData, this.id);
            this.updateCalForm.reset();
            this.sbAlert.open('Calendar Updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
