import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../../models/User';
import { UserService } from '../../../../services/user.service';

@Component({
    selector: 'ddw-admin-user-list',
    templateUrl: './admin-user-list.component.html',
    styleUrls: ['./admin-user-list.component.css']
})
export class AdminUserListComponent implements OnInit {
    users$: Observable<User[]>;
    user: User;
    id: string;


    constructor(
      public userService: UserService,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();

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
