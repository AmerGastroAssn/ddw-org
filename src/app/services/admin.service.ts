import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/User';
import { AuthService } from './auth.service';
import { AdminUserService } from './admin-user.service';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    user: any;
    uid: string;
    currentUser: User;
    public isAdminUser: boolean;

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private authService: AuthService,
      private adminUserService: AdminUserService,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    ifAdminUser() {
        if (this.currentUser.admin) {
            this.isAdminUser = true;
        } else {
            this.isAdminUser = false;
        }
    }


    //
    // adminUser() {
    //     this.userService.getUserInfo()
    //         .map((userArr) => {
    //             userArr.forEach((userInfo) => {
    //                 if (this.afAuth.auth.currentUser.email === userInfo.email) {
    //                     if (userInfo.admin === true) {
    //                         this.isAdminUser = userInfo.admin;
    //                     } else {
    //                         console.log(this.isAdminUser);
    //                         this.isAdminUser = !userInfo.admin;
    //                     }
    //                 }
    //
    //             });
    //
    //         });
    // }


}
