import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../../../models/User';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AdminUserService } from '../../../../services/admin-user.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-bottom-sheet-new',
    templateUrl: './admin-bottom-sheet-new.component.html',
    styleUrls: ['./admin-bottom-sheet-new.component.css']
})
export class AdminBottomSheetNewComponent implements OnInit {
    uid: string;
    $key: string;
    user$: Observable<User>;
    user: User;
    isAdmin: boolean;

    constructor(
      private bottomSheetRef: MatBottomSheetRef<AdminBottomSheetNewComponent>,
      private authService: AuthService,
      private adminUserService: AdminUserService,
      private settingsService: AdminSettingsService,
      private afs: AngularFirestore,
      private afAuth: AngularFireAuth,
    ) {
    }

    openLink(event: MouseEvent): void {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    }

    ngOnInit() {
        // Get auth data, then get firestore user document || null
        this.user$ = this.afAuth.authState.pipe(
          switchMap(user => {
              if (user) {
                  return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                  return of(null);
              }
          }));
        // Unwraps the observable to extract the data.
        this.user$.subscribe((currentUserInfo) => {
            if (currentUserInfo && this.afAuth.auth.currentUser) {
                this.user = currentUserInfo;
                this.isAdmin = currentUserInfo.admin === true;
            } else {
                return of(null);
            }
        });
    }

}
