import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/User';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'ddw-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
    users$: Observable<User[]>;
    localUser: User;
    adminUser: any;
    isAdmin: boolean;

    constructor(public userService: UserService,
                private authService: AuthService,
                private afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.getAdminUserVals();
        this.users$ = this.userService.getUsers();
        this.localUser = this.authService.getProfile();
    }

    async getAdminUserVals() {
        const loggedInUser = await this.authService.isLoggedIn();
        if (loggedInUser) {
            this.authService.users$.subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                      if (this.afAuth.auth.currentUser.email === userInfo.email) {
                          if (userInfo.admin) {
                              this.adminUser = userInfo;
                              console.log(userInfo);
                              this.isAdmin = true;
                          } else {
                              this.isAdmin = false;
                              console.log(this.isAdmin);
                          }
                      }
                  }
                );
            });
        }
    }


}
