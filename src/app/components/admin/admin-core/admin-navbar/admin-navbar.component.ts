import { Component, OnInit } from '@angular/core';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    id: string;

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private settingsService: AdminSettingsService
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

    }

    onLogout() {
        this.authService.logout();
    }


}
