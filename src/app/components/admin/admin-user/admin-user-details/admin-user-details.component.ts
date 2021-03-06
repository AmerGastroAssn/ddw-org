import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../../../models/User';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../../../services/auth.service';
import { AdminUserService } from '../../../../services/admin-user.service';

@Component({
    selector: 'ddw-admin-user-details',
    templateUrl: './admin-user-details.component.html',
    styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {
    id: string;
    user: User;
    uid: string;
    admin: boolean;
    localUser: User;
    isAdmin: boolean;
    adminUser: User;


    constructor(
      private adminUserService: AdminUserService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private afs: AngularFirestore,
      public adminService: AdminService,
      private afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminUserService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
            }
        });

        this.localUser = this.authService.getProfile();

        // Is Admin?
        this.adminUserService.getUsersInfo()
            .subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                    if (this.afAuth.auth.currentUser.email === userInfo.email) {
                        if (userInfo.admin === true) {
                            this.adminUser = userInfo;
                            this.isAdmin = true;
                        } else {
                            this.isAdmin = false;
                        }
                    }
                });
            });
    }


    onDeleteUser() {
        this.adminUserService.deleteUser(this.id);
    }


}
