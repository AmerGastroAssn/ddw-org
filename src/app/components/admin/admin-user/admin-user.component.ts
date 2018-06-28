import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'ddw-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
    users$: Observable<User[]>;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        this.users$ = this.userService.getUsers();
        console.log(Date.now());
    }


}
