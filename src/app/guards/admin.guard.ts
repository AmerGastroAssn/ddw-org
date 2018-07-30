import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    currentUser: User;

    constructor(
      private authService: AuthService,
      private router: Router,
      public flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.currentUser = this.authService.getProfile();
    }


    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (this.currentUser.admin === true) {
            return true;
        } else {
            this.router.navigate(['/admin/login']);
            this.flashMessage.show(`Sorry, you do not have sufficient privileges. Please contact the Web Development team for help.`, {
                cssClass: 'alert-warning',
                timeout: 5000
            });
            this.sbAlert.open('Sorry, you do not have sufficient privileges. Please contact the Web Development team for help.', 'Dismiss', {
                duration: 5000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-warning']
            });
            return false;
        }
    }
}
