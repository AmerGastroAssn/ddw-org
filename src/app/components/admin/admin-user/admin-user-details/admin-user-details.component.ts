import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../../../models/User';
import { AdminRolesService } from '../../../../services/admin-roles.service';
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

    constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private authService: AuthService,
      private afs: AngularFirestore,
      private adminRolesService: AdminRolesService,
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
    }


    onDeleteUser() {
        this.userService.deleteUser(this.id);

    }


}
