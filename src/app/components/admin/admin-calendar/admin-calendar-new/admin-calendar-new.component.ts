import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';

@Component({
    selector: 'ddw-admin-calendar-new',
    templateUrl: './admin-calendar-new.component.html',
    styleUrls: ['./admin-calendar-new.component.css'],
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
export class AdminCalendarNewComponent implements OnInit {
    newCalForm: FormGroup;
    calendar: Calendar;
    // calColumnValues: CalColumnValues;

    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: string;
    date2: string;
    date3: string;
    date4: string;
    tab1Date: string;
    tab2Date: string;
    tab3Date: string;
    tab4Date: string;
    title: string;
    displayName: string;
    id: string;
    color = 'primary';
    // bsConfig: Partial<BsDatepickerConfig>;

    CkeditorConfig = {
        allowedContent: true,
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };

    constructor(
      private calendarService: AdminCalendarService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private sbAlert: MatSnackBar,
    ) {
        // Datepicker Config
        // this.bsConfig = Object.assign({},
        //   {
        //       containerClass: 'theme-default',
        //       dateInputFormat: 'MMMM Do YYYY'
        //   });

        // New Calendar:
        this.newCalForm = this.fb.group({
            body1: ['', Validators.required],
            body2: [''],
            body3: [''],
            body4: [''],
            date1: ['', Validators.required],
            date2: [''],
            date3: [''],
            date4: [''],
            tab1Date: [''],
            tab2Date: [''],
            tab3Date: [''],
            tab4Date: [''],
            title: ['', Validators.required],
            displayName: [''],
            id: [''],
        });

        this.title = this.newCalForm.value.title;
        this.body1 = this.newCalForm.value.body1;
        this.body2 = this.newCalForm.value.body2;
        this.body3 = this.newCalForm.value.body3;
        this.body4 = this.newCalForm.value.body4;
        this.date1 = this.newCalForm.value.date1;
        this.date2 = this.newCalForm.value.date2;
        this.date3 = this.newCalForm.value.date3;
        this.date4 = this.newCalForm.value.date4;
        this.tab1Date = this.newCalForm.value.tab1Date;
        this.tab2Date = this.newCalForm.value.tab2Date;
        this.tab3Date = this.newCalForm.value.tab3Date;
        this.tab4Date = this.newCalForm.value.tab4Date;
        this.displayName = this.newCalForm.value.displayName;
        this.id = this.newCalForm.value.id;
    }


    ngOnInit() {
        // // Get Column Values
        // this.calendarService.getCalColumnValues()
        //     .subscribe((values) => {
        //         this.calColumnValues = values;
        //     });
    }

    // Reactive Form
    onCalendarCreate(calendarData) {
        if (!this.newCalForm.valid) {
            this.sbAlert.open('The Title, Date 1 and Body 1 must be filled out, Event was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.saveCalendar(calendarData);
            this.newCalForm.reset();
            this.sbAlert.open('New Calendar created!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
