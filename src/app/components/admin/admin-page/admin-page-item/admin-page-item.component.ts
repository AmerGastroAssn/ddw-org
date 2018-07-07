import { Component, Input, OnInit } from '@angular/core';
import { Page } from '../../../../models/Page';

@Component({
    selector: 'ddw-admin-page-item',
    templateUrl: './admin-page-item.component.html',
    styleUrls: ['./admin-page-item.component.css']
})
export class AdminPageItemComponent implements OnInit {
    @Input() page: Page;
    @Input() index: number;

    constructor() {
    }

    ngOnInit() {
    }

}
