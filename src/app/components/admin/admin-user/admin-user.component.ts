import { Component, OnInit } from '@angular/core';
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

    constructor(public userService: UserService,
                private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
    }


}
