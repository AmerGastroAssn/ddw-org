import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
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
    user: Observable<User>;
    localUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    id: string;
    dbUser: any;
    isAdmin: boolean;
    email: string;

    constructor(
      private authService: AuthService,
      private userService: UserService,
      private settingsService: AdminSettingsService,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth,
    ) {

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
        // Is Admin?
        this.userService.getUsersInfo()
            .subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                    if (this.afAuth.auth.currentUser.email === userInfo.email) {
                        if (userInfo.admin === true) {
                            this.dbUser = userInfo;
                            this.isAdmin = true;
                        } else {
                            this.dbUser = this.localUser;
                            this.isAdmin = false;
                        }
                    }
                });
            });
    }

    onLogout() {
        this.authService.logout(this.loggedInUser);
        // this.authService.setUserToOffline(this.dbUser)
        //     .then(() => {
        //         this.authService.logout(this.dbUser);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }


}
