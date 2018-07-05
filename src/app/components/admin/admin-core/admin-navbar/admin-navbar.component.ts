import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-navbar',
    templateUrl: './admin-navbar.component.html',
    styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
    isLoggedIn: boolean;
    loggedInUser: string;
    user: User;

    constructor(
      private authService: AuthService,
      private router: Router
    ) {
        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.isLoggedIn = true;
                this.loggedInUser = auth.email;
                console.log(auth.email);
            } else {
                this.isLoggedIn = false;
                // this.router.navigate(['/admin/login']);
            }
        });

    }

    ngOnInit() {
    }

    onLogout() {
        this.authService.logout();
    }


}
