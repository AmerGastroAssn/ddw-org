import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-user-list',
    templateUrl: './admin-user-list.component.html',
    styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
    users$: Observable<User[]>;
    user: User;
    authUser: Observable<User>;
    id: string;
    onlineDate: string;


    constructor(
      public userService: UserService,
      private route: ActivatedRoute,
      public authService: AuthService,
      public afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
        // this.onlineDate = this.afAuth.auth.currentUser.metadata.lastSignInTime;
        this.users$.subscribe(info => console.log(info));

        // this.authService.users$
        //     .subscribe((info) => {
        //         // this.onlineDate = info;
        //         console.log(info);
        //     });

        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.userService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
            }
        });
    }


}
