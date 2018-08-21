import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Calendar } from '../../../../../models/Calendar';
import { AdminCalendarService } from '../../../../../services/admin-calendar.service';

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
    calendarForm1: FormGroup;
    calendarForm2: FormGroup;
    calendarForm3: FormGroup;
    calendarForm4: FormGroup;
    calendarForm5: FormGroup;
    calendarForm6: FormGroup;
    calendarForm7: FormGroup;
    calendar1: Calendar;
    calendar2: Calendar;
    calendar3: Calendar;
    calendar4: Calendar;
    calendar5: Calendar;
    calendar6: Calendar;
    calendar7: Calendar;
    $key: string;
    body: string;
    date: number;
    time: string;
    color = 'primary';
    bsConfig: Partial<BsDatepickerConfig>;

    constructor(
      private calendarService: AdminCalendarService,
      private fb: FormBuilder,
    ) {
        // Datepicker Config
        this.bsConfig = Object.assign({},
          {
              containerClass: 'theme-default',
              dateInputFormat: 'MMMM Do YYYY,h:mm a'
          });
    }

    ngOnInit() {
        // Get Event 1
        this.calendarService.getCalendar1().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar1 = calendar;
                // Form:
                this.calendarForm1 = this.fb.group({
                    $key: [this.calendarService.cal1$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal1$key]
                });

                this.$key = this.calendarForm1.value.$key;
                this.body = this.calendarForm1.value.body;
                this.date = this.calendarForm1.value.date;
                this.time = this.calendarForm1.value.time;
            }
        });

        // Get Event 2
        this.calendarService.getCalendar2().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar2 = calendar;
                // Form:
                this.calendarForm2 = this.fb.group({
                    $key: [this.calendarService.cal2$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal2$key]
                });

                this.$key = this.calendarForm2.value.$key;
                this.body = this.calendarForm2.value.body;
                this.date = this.calendarForm2.value.date;
                this.time = this.calendarForm2.value.time;
            }
        });

        // Get Event 3
        this.calendarService.getCalendar3().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar3 = calendar;
                // Form:
                this.calendarForm3 = this.fb.group({
                    $key: [this.calendarService.cal3$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal3$key]
                });

                this.$key = this.calendarForm3.value.$key;
                this.body = this.calendarForm3.value.body;
                this.date = this.calendarForm3.value.date;
                this.time = this.calendarForm3.value.time;
            }
        });

        // Get Event 4
        this.calendarService.getCalendar4().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar4 = calendar;
                // Form:
                this.calendarForm4 = this.fb.group({
                    $key: [this.calendarService.cal4$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal4$key]
                });

                this.$key = this.calendarForm4.value.$key;
                this.body = this.calendarForm4.value.body;
                this.date = this.calendarForm4.value.date;
                this.time = this.calendarForm4.value.time;
            }
        });

        // Get Event 5
        this.calendarService.getCalendar5().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar5 = calendar;
                // Form:
                this.calendarForm5 = this.fb.group({
                    $key: [this.calendarService.cal5$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal5$key]
                });

                this.$key = this.calendarForm5.value.$key;
                this.body = this.calendarForm5.value.body;
                this.date = this.calendarForm5.value.date;
                this.time = this.calendarForm5.value.time;
            }
        });

        // Get Event 6
        this.calendarService.getCalendar6().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar6 = calendar;
                // Form:
                this.calendarForm6 = this.fb.group({
                    $key: [this.calendarService.cal6$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal6$key]
                });

                this.$key = this.calendarForm6.value.$key;
                this.body = this.calendarForm6.value.body;
                this.date = this.calendarForm6.value.date;
                this.time = this.calendarForm6.value.time;
            }
        });

        // Get Event 7
        this.calendarService.getCalendar7().subscribe((calendar) => {
            if (calendar !== null) {
                this.calendar7 = calendar;
                // Form:
                this.calendarForm7 = this.fb.group({
                    $key: [this.calendarService.cal7$key],
                    body: [this.body],
                    date: [this.date],
                    time: [this.time],
                    uid: [this.calendarService.cal7$key]
                });

                this.$key = this.calendarForm7.value.$key;
                this.body = this.calendarForm7.value.body;
                this.date = this.calendarForm7.value.date;
                this.time = this.calendarForm7.value.time;
            }
        });
    }


    onCalendar1Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm1.reset(this.calendarService.getCalendar1());
    }

    onCalendar2Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm2.reset(this.calendarService.getCalendar2());
    }

    onCalendar3Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm3.reset(this.calendarService.getCalendar3());
    }

    onCalendar4Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm4.reset(this.calendarService.getCalendar4());
    }

    onCalendar5Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm5.reset(this.calendarService.getCalendar5());
    }

    onCalendar6Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm6.reset(this.calendarService.getCalendar6());
    }

    onCalendar7Submit(calendarData) {
        this.calendarService.updateCalendar(calendarData);
        this.calendarForm7.reset(this.calendarService.getCalendar7());
    }

}
