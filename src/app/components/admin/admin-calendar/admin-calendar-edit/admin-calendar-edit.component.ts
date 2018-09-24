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
    date1: any;
    date2: any;
    date3: any;
    date4: any;
    title: string;
    displayName: string;
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
        height: 500,
        extraAllowedContent: 'span;ul;li;table;td;style;*[id];*(*);*{*}',
    };


    constructor(
      private calendarService: AdminCalendarService,
      private fb: FormBuilder,
      private route: ActivatedRoute,
      private sbAlert: MatSnackBar,
    ) {
        // Get id from url
        this.$key = this.route.snapshot.params['id'];
        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY'
          });

        // Edit Calendar:
        this.calendarService.getCalendar(this.$key).subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar = calendar;

                this.updateCalForm = this.fb.group({
                    $key: [calendar.$key],
                    body1: [calendar.body1, Validators.required],
                    body2: [calendar.body2, Validators.required],
                    body3: [calendar.body3],
                    body4: [calendar.body4],
                    date1: [calendar.date1],
                    date2: [calendar.date2],
                    date3: [calendar.date3],
                    date4: [calendar.date4],
                    title: [calendar.title, Validators.required],
                    displayName: [calendar.displayName, Validators.required],
                    uid: [calendar.uid],
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
                this.displayName = this.updateCalForm.value.displayName;
                this.uid = this.updateCalForm.value.uid;
            }
        });


    }

    ngOnInit() {

        // Get Event 1
        this.calendarService.getCalendar(this.$key)
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
            this.sbAlert.open('Missing at least one input, Calendar was NOT created.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.updateCalendar(calendarData, this.$key);
            console.log(calendarData);
            this.updateCalForm.reset();
            this.sbAlert.open('Calendar Updated!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }


}
