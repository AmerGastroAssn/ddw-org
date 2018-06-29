import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../../models/User';

@Component({
    selector: 'ddw-admin-user-item',
    templateUrl: './admin-user-item.component.html',
    styleUrls: ['./admin-user-item.component.css']
})
export class AdminUserItemComponent implements OnInit {
    @Input() user: User;
    @Input() index: number;

    constructor() {
    }

    ngOnInit() {
    }

}
