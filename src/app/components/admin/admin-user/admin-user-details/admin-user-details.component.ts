import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-user-details',
    templateUrl: './admin-user-details.component.html',
    styleUrls: ['./admin-user-details.component.css']
})
export class AdminUserDetailsComponent implements OnInit {
    id: string;
    user: User;

    constructor(
      private userService: UserService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get User
        this.userService.getUser(this.id).subscribe((user) => {
            if (user !== null) {
                this.user = user;
                console.log(this.user);
            }
        });

    }

}
