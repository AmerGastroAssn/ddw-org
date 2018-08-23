import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CalColumnValues } from '../../../../models/CalColumnValues';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';


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

    $key: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
    date1: number;
    date2: number;
    date3: number;
    date4: number;
    title: string;
    uid: string;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;

    column1: string;
    column2: string;
    column3: string;
    column4: string;
    currentDate = new Date();

    CkeditorConfig = {
        allowedContent: true,
        height: 200,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };


    constructor(
      private calendarService: AdminCalendarService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private sbAlert: MatSnackBar,
    ) {
        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY'
          });

        // New Calendar:
        this.updateCalForm = this.fb.group({
            $key: [''],
            body1: ['', Validators.required],
            body2: ['', Validators.required],
            body3: [''],
            body4: [''],
            date1: ['', Validators.required],
            date2: ['', Validators.required],
            date3: [''],
            date4: [''],
            title: ['', Validators.required],
            uid: [''],
        });

        this.$key = this.updateCalForm.value.$key;
        this.title = this.updateCalForm.value.title;
        this.body1 = this.updateCalForm.value.body1;
        this.body2 = this.updateCalForm.value.body2;
        this.body3 = this.updateCalForm.value.body3;
        this.body4 = this.updateCalForm.value.body4;
        this.date1 = this.updateCalForm.value.date1;
        this.date2 = this.updateCalForm.value.date2;
        this.date3 = this.updateCalForm.value.date3;
        this.date4 = this.updateCalForm.value.date4;
        this.uid = this.updateCalForm.value.uid;
    }

    ngOnInit() {
        // Get id from url
        this.$key = this.route.snapshot.params['id'];
        // Get Event 1
        this.calendarService.getCalendar(this.$key)
            .subscribe((calInfo) => {
                this.calendar = calInfo;
            });
        // Get Column Values
        this.calendarService.getCalColumnValues()
            .subscribe((values) => {
                this.calColumnValues = values;
            });
    }


    // Reactive Form
    onCalendarUpdate(calendarData) {
        if (!this.updateCalForm.valid) {
            this.sbAlert.open('Missing at least one input, Event was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.updateCalendar(calendarData, this.$key);
            console.log(calendarData);
            this.updateCalForm.reset();
            this.sbAlert.open('New Event created!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
