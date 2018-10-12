import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../../../services/auth.service';

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
    showCalendarToggle: boolean;
    showPressReleaseToggle: boolean;
    showPageCardToggle: boolean;
    showImagesToggle: boolean;
    showFilesToggle: boolean;
    user: User;
    user$: Observable<User>;
    isAdmin: boolean;
    dbUser: User;

    constructor(
      private authService: AuthService,
      private adminUserService: AdminUserService,
      private settingsService: AdminSettingsService,
      private adminService: AdminService,
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore
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
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }

    onShowPagesToggle() {
        this.showPagesToggle = !this.showPagesToggle;
    }

    onShowUsersToggle() {
        this.showUsersToggle = !this.showUsersToggle;
    }

    onShowCalendarToggle() {
        this.showCalendarToggle = !this.showCalendarToggle;
    }

    onShowPressReleaseToggle() {
        this.showPressReleaseToggle = !this.showPressReleaseToggle;
    }

    onShowPageCardToggle() {
        this.showPageCardToggle = !this.showPageCardToggle;
    }


    onShowImagesToggle() {
        this.showImagesToggle = !this.showImagesToggle;
    }



    onShowFilesToggle() {
        this.showFilesToggle = !this.showFilesToggle;
    }


    onLogout() {
        this.authService.logout();
    }


}
