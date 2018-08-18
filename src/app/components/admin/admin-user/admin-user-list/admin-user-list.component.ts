import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { AdminUserService } from '../../../../services/admin-user.service';

@Component({
    selector: 'ddw-admin-user-list',
    templateUrl: './admin-user-list.component.html',
    styleUrls: ['./admin-user-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({opacity: 0}),
                animate(600 )
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(300, style({opacity: 0})))
        ])
    ]
})
export class AdminUserListComponent implements OnInit {
    users$: Observable<User[]>;
    user: User;
    authUser: Observable<User>;
    id: string;
    onlineDate: string;


    constructor(
      public adminUserService: AdminUserService,
      private route: ActivatedRoute,
      public authService: AuthService,
      public afAuth: AngularFireAuth,
    ) {
    }

    ngOnInit() {
        this.users$ = this.adminUserService.getUsers();
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
        this.adminUserService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
            }
        });
    }


}
