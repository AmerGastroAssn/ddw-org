import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-sidenav',
    templateUrl: './admin-sidenav.component.html',
    styleUrls: ['./admin-sidenav.component.css']
})
export class AdminSidenavComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    currentUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    id: string;
    showPagesToggle: boolean;
    showUsersToggle: boolean;
    user: User;
    isAdmin: boolean;
    dbUser: User;

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private settingsService: AdminSettingsService,
      private adminService: AdminService,
      private afAuth: AngularFireAuth
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
                this.currentUser = this.authService.getProfile();
            } else {
                this.isLoggedIn = false;
            }
        });

        // Is Admin?
        this.userService.getUsersInfo()
            .subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                    if (this.afAuth.auth.currentUser.email === userInfo.email) {
                        if (userInfo.admin === true) {
                            this.dbUser = userInfo;
                            this.isAdmin = true;
                        } else {
                            this.dbUser = this.currentUser;
                            this.isAdmin = false;
                        }
                    }
                });
            });
    }

    onShowPagesToggle() {
        this.showPagesToggle = !this.showPagesToggle;
    }

    onShowUsersToggle() {
        this.showUsersToggle = !this.showUsersToggle;
    }

    onLogout() {
        this.authService.logout(this.dbUser);
    }


}
