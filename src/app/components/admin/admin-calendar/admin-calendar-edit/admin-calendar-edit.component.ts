import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
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
    @ViewChild('calF') calF: NgForm;
    @ViewChild('colVF') colVF: NgForm;
    calendar: Calendar;
    calColumnValues: CalColumnValues;

    $key: string;
    body: string;
    date: number;
    column: string;
    endTime: number;
    startTime: number;
    title: string;
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


    onCalendarSubmit(calendarData: NgForm) {
        const value = calendarData.value;
        const newCalEvent = new Calendar(
          value.$key = this.$key,
          value.body,
          value.column,
          value.date,
          value.endTime,
          value.startTime,
          value.title,
          value.uid = this.$key,
        );

        if (!calendarData.valid) {
            this.sbAlert.open('Calendar Event Not Valid!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.updateCalendar(newCalEvent);
            console.log('Cal Event Good', newCalEvent);
        }
        // this.calF.reset(this.calendarService.getCalendar(this.$key));
    }


    onColumnSubmit(columnData: NgForm) {
        const value = columnData.value;
        const newColumns = new CalColumnValues(
          this.calColumnValues.$key,
          value.column1,
          value.column2,
          value.column3,
          value.column4,
          this.calColumnValues.uid,
        );

        if (!columnData.valid) {
            this.sbAlert.open('Columns/Days Not Valid!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.updateCalColumnValues(newColumns);
            console.log('Column events sent', newColumns);
        }
        // this.calF.reset(this.calendarService.getCalendar(this.$key));
    }


}
