import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ddw-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    toggleSidenav: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    onToggleSidenav() {
        this.toggleSidenav = !this.toggleSidenav;
    }

}
