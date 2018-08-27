import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user: Observable<User>;
    localUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    id: string;
    dbUser: any;
    isAdmin: boolean;
    email: string;
    currentDate: Date;

    constructor(
      private authService: AuthService,
      private adminUserService: AdminUserService,
      private settingsService: AdminSettingsService,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth,
    ) {
        this.currentDate = new Date();
    }

    ngOnInit() {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
                // this.user = this.afs.doc<User>(`users/${auth.uid}`).valueChanges();
            } else {
                this.isLoggedIn = false;
            }
        });

        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        // Gets User in Local Storage
        this.localUser = this.authService.getProfile();

        // Gets the correct user for navbar profile and checks if is admin.
        this.adminUserService.getUsersInfo()
            .subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                    if (userInfo) {
                        if (this.afAuth.auth.currentUser.email === userInfo.email) {
                            return this.dbUser = userInfo;
                        } else if (this.localUser != null) {
                            this.dbUser = this.localUser;
                        } else {
                            return null;
                        }
                        if (this.afAuth.auth.currentUser.email === userInfo.email) {
                            this.isAdmin = userInfo.admin === true;
                            console.log(this.isAdmin);
                        } else {
                            return null;
                        }
                    }
                });
            });


    }

    onLogout() {
        this.authService.logout();
    }


}
