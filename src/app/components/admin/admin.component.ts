import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'ddw-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    toggleSidenav: boolean;

    constructor(public authService: AuthService) {
    }

    ngOnInit() {
        const user = this.authService.fbUser$;
    }

    onToggleSidenav() {
        this.toggleSidenav = !this.toggleSidenav;
    }

}
