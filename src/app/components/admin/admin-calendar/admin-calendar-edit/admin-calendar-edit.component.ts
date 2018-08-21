import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';

interface ColumnDay {
    column: string;
}

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
    calendar: Calendar;

    $key: string;
    body: string;
    date: number;
    column: number;
    endTime: number;
    startTime: number;
    title: string;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;

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
              dateInputFormat: 'MMMM Do YYYY,h:mm a'
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


        // this.calendarService.getCalendar(this.$key).subscribe((calendar) => {
        //     if (calendar !== null) {
        //         this.calendar = calendar;
        //         // Form:
        //         this.calendarForm = this.fb.group({
        //             $key: [this.calendarService.$key],
        //             body: [this.body],
        //             date: [this.date],
        //             column: [this.column],
        //             endTime: [this.endTime],
        //             startTime: [this.startTime],
        //             title: [this.title],
        //             uid: [this.calendarService.$key]
        //         });
        //
        //         this.$key = this.calendarForm.value.$key;
        //         this.body = this.calendarForm.value.body;
        //         this.column = this.calendarForm.value.column;
        //         this.endTime = this.calendarForm.value.endTime;
        //         this.startTime = this.calendarForm.value.startTime;
        //         this.title = this.calendarForm.value.title;
        //         this.date = this.calendarForm.value.date;
        //     }
        // });

    }


    onCalendarSubmit(calendarData: NgForm) {
        const value = calendarData.value;
        const newCalEvent = new Calendar(
          value.$key = this.$key,
          value.body,
          value.date,
          value.column,
          value.startTime,
          value.endTime,
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


}
