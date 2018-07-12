import { Component, OnInit } from '@angular/core';

// const SideNav = require('./sidenav.js').SideNav;

@Component({
    selector: 'ddw-admin-sidenav',
    templateUrl: './admin-sidenav.component.html',
    styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {
    showUsersToggle: boolean;
    showPagesToggle: boolean;

    constructor() {
    }

    ngOnInit() {

    }

    onShowUsersToggle() {
        console.log('show users');
        this.showUsersToggle = !this.showUsersToggle;
    }

    onShowPagesToggle() {
        console.log('show pages');
        this.showPagesToggle = !this.showPagesToggle;
    }
}
