import { Component, Input, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { Calendar } from '../../../../models/Calendar';

@Component({
    selector: 'ddw-admin-calendar-item',
    templateUrl: './admin-calendar-item.component.html',
    styleUrls: ['./admin-calendar-item.component.css']
})
export class AdminCalendarItemComponent implements OnInit {
    @Input() calendar: Calendar;
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
    month: string;
    month2: string;
    month3: string;
    month4: string;

    constructor() {
    }

    ngOnInit() {
        this.isAbbrvDate();
    }

    isAbbrvDate() {

    }

}
