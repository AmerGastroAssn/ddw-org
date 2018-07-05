import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-user-details',
    templateUrl: './admin-user-details.component.html',
    styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {
    signedInUserCol: AngularFirestoreCollection<User>;
    signedInUser$: Observable<User>;
    id: string;
    user: User;
    currentUserIsAdmin: boolean;
    currentUser;
    uid: string;

    constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private authService: AuthService,
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore
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
        this.userService.deleteUser(this.user.uid);
    }


}
