import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user: User;
    allowSignup: boolean;

    constructor(
      private authService: AuthService,
      private router: Router,
      private settingsService: AdminSettingsService
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                console.log(auth.email);
            } else {
                this.isLoggedIn = false;
                // this.router.navigate(['/admin/login']);
            }
        });

    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
    }

    onLogout() {
        this.authService.logout();
    }


}
