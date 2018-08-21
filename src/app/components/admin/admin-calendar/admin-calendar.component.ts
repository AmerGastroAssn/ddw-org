import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../../../models/Calendar';
import { AdminCalendarService } from '../../../services/admin-calendar.service';

@Component({
    selector: 'ddw-admin-calendar',
    templateUrl: './admin-calendar.component.html',
    styleUrls: ['./admin-calendar.component.css']
})
export class AdminCalendarComponent implements OnInit {
    calendarEvents$: Observable<Calendar[]>;
    day: string;

    constructor(
      readonly adminCalendarService: AdminCalendarService,
    ) {
    }

    ngOnInit() {
        this.calendarEvents$ = this.adminCalendarService.getAllCalendarEvents();
    }
}
