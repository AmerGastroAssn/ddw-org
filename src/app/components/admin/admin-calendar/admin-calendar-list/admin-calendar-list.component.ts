import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';

@Component({
    selector: 'ddw-admin-calendar-list',
    templateUrl: './admin-calendar-list.component.html',
    styleUrls: ['./admin-calendar-list.component.css'],
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
export class AdminCalendarListComponent implements OnInit {
    calendarEvents$: Calendar[];

    constructor(
      public adminCalendarService: AdminCalendarService,
    ) {
    }

    ngOnInit() {
        this.adminCalendarService.getAllCalendarEvents()
            .subscribe((dates) => {
                this.calendarEvents$ = dates;
            });
    }

}
