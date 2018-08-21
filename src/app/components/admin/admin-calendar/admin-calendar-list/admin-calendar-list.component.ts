import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Calendar } from '../../../../models/Calendar';
import { AdminCalendarService } from '../../../../services/admin-calendar.service';

@Component({
    selector: 'ddw-admin-calendar-list',
    templateUrl: './admin-calendar-list.component.html',
    styleUrls: ['./admin-calendar-list.component.css']
})
export class AdminCalendarListComponent implements OnInit {
    calendarEvents$: Observable<Calendar[]>;

    constructor(
      public adminCalendarService: AdminCalendarService,
    ) {
    }

    ngOnInit() {
        this.calendarEvents$ = this.adminCalendarService.getAllCalendarEvents();
    }

}
