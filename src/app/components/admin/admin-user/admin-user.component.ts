import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'ddw-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
    // users$: Observable<User[]>;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        // this.users$ = this.userService.getUsers();
    }


}
