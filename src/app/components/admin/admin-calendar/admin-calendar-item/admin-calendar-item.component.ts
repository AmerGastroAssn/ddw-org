import { Component, Input, OnInit } from '@angular/core';
import { Calendar } from '../../../../models/Calendar';

@Component({
    selector: 'ddw-admin-calendar-item',
    templateUrl: './admin-calendar-item.component.html',
    styleUrls: ['./admin-calendar-item.component.css']
})
export class AdminCalendarItemComponent implements OnInit {
    @Input() calendar: Calendar;
    body: string;
    date: number;
    endTime: number;
    startTime: number;
    title: string;

    constructor() {
    }

    ngOnInit() {
    }

}
