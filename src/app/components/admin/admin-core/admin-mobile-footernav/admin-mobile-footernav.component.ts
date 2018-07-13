import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-mobile-footernav',
    templateUrl: './admin-mobile-footernav.component.html',
    styleUrls: ['./admin-mobile-footernav.component.css']
})
export class AdminMobileFooternavComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    allowSignup: boolean;
    allowSettings: boolean;
    currentUser: User;
    uid: string;

    constructor(
      private authService: AuthService,
      private settingsService: AdminSettingsService,
    ) {
    }

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
                this.currentUser = this.authService.getProfile();
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }

}
