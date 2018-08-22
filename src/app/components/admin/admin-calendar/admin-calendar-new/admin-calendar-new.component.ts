import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { CalColumnValues } from '../../../../models/CalColumnValues';
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
    @ViewChild('calF') calF: NgForm;
    calendar: Calendar;
    calColumnValues: CalColumnValues;

    $key: string;
    uid: string;
    body: string;
    date: number;
    column: string;
    endTime: number;
    startTime: number;
    title: string;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;

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
        // Get Column Values
        this.calendarService.getCalColumnValues()
            .subscribe((values) => {
                this.calColumnValues = values;
            });
    }

    onCalendarCreate(calendarData: NgForm) {
        const value = calendarData.value;
        const newCalEvent = new Calendar(
          value.$key,
          value.body,
          value.date,
          value.column,
          value.startTime,
          value.endTime,
          value.title,
          value.uid,
        );

        if (!calendarData.valid) {
            this.sbAlert.open('Calendar Event Not Valid!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.calendarService.saveCalendar(newCalEvent);
            console.log('Cal Event Good', newCalEvent);
        }
        // this.calF.reset(this.calendarService.getCalendar(this.$key));
    }

}
