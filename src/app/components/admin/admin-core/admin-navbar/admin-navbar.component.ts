import { AfterContentInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit, AfterContentInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user$: Observable<User>;
    localUser: User;
    allowSignup: boolean;
    allowSettings: boolean;
    uid: string;
    $key: string;
    user: User;
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
        // Gets User in Local Storage
        if (this.isLoggedIn) {
            this.localUser = this.authService.getProfile();
        }
    }

    ngOnInit() {
        // Checks authentication of user and get's ID.
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                this.uid = auth.uid;
            } else {
                this.isLoggedIn = false;
            }


            // Get auth data, then get firestore user document || null
            this.user$ = this.afAuth.authState.pipe(
              switchMap(user => {
                  if (user) {
                      return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                  } else {
                      return of(null);
                  }
              }));

            this.user$.subscribe((currentUserInfo) => {
                if (currentUserInfo) {
                    this.user = currentUserInfo;
                    this.authService.setUserInLocalStorage(currentUserInfo);
                    this.isAdmin = currentUserInfo.admin === true;
                } else {
                    return of(null);
                }
            });
        });

        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

        // Gets the correct user for navbar profile and checks if is admin.
        // this.adminUserService.getUsersInfo()
        //     .subscribe((userArr) => {
        //         this.authService.setUserInLocalStorage(localUserInfo);
        //         this.isAdmin = localUserInfo.admin === true;
        //         this.localUser = localUserInfo;
        //         // userArr.forEach((userInfo) => {
        //         //     if (this.afAuth.auth) {
        //         //         if (this.afAuth.auth.currentUser.email === userInfo.email) {
        //         //             this.adminUserService.getUser(userInfo.uid)
        //         //                 .subscribe((localUserInfo) => {
        //         //                     console.log('localuserInfo', localUserInfo);
        //         //                     this.authService.setUserInLocalStorage(localUserInfo);
        //         //                     this.isAdmin = localUserInfo.admin === true;
        //         //                     this.localUser = localUserInfo;
        //         //                 });
        //         //         } else {
        //         //             setTimeout(() => {
        //         //                 // this.dbUser = this.localUser;
        //         //             }, 1500);
        //         //         }
        //         //     }
        //         // });
        //     });
    }

    ngAfterContentInit() {

    }

    onLogout() {
        this.authService.logout();
    }


}
