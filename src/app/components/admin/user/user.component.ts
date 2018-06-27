import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'ddw-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    users$: Observable<User[]>;

    constructor(public userService: UserService) {
    }

    ngOnInit() {
        this.users$ = this.userService.getAllUsers();
    }


}
