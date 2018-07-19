import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../../../models/User';
import { AdminService } from '../../../../services/admin.service';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

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
    currentUser: User;

    constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private afs: AngularFirestore,
      public adminService: AdminService,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.userService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
            }
        });

        this.currentUser = this.authService.getProfile();
    }


    onDeleteUser() {
        this.userService.deleteUser(this.id);
    }


}
