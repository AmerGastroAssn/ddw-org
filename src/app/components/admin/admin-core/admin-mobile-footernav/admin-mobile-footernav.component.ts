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
    localUser: User;
    uid: string;

    constructor(
      public authService: AuthService,
      private settingsService: AdminSettingsService,
    ) {

        if (this.isLoggedIn) {
            this.localUser = this.authService.getProfile();
        }
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
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }

}
