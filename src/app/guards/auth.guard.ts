import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      private flashMessage: FlashMessagesService
    ) {
    }

    canActivate(): Observable<boolean> {
        return (this.afAuth.authState)
        .take(1)
        .map((state) => !!state)
        .do((authenticated) => {
            if (!authenticated) {
                this.router.navigate(['/admin/login']);
                this.flashMessage.show(`Please log in`, {
                    cssClass: 'alert-warning',
                    timeout: 3000
                });
            }
        });
    }

}
