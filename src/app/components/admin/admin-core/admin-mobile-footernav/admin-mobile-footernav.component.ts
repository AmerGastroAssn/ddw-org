import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-mobile-footernav',
    templateUrl: './admin-mobile-footernav.component.html',
    styleUrls: ['./admin-mobile-footernav.component.css']
})
export class AdminMobileFooternavComponent implements OnInit {
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
        // Gets User in Local Storage
        if (this.isLoggedIn) {
            this.localUser = this.authService.getProfile();
        }

        // Checks authentication of user and get's ID.
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

    ngOnInit() {
        // Settings:
        this.allowSignup = this.settingsService.getAdminSettings().allowSignup;
        this.allowSettings = this.settingsService.getAdminSettings().allowSettings;

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
            if (currentUserInfo && this.afAuth.auth.currentUser) {
                this.user = currentUserInfo;
                this.authService.setUserInLocalStorage(currentUserInfo);
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }

    onLogout() {
        this.authService.logout();
    }

}
