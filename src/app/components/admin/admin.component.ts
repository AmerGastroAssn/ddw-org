import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'ddw-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    toggleSidenav: boolean;
    showDelay = new FormControl(1000);
    hideDelay = new FormControl(0);

    constructor(public authService: AuthService) {

    }

    ngOnInit() {
    }

    onToggleSidenav() {
        this.toggleSidenav = !this.toggleSidenav;
    }

}
