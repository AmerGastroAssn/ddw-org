import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
      private afAuth: AngularFireAuth,
      private flashMessage: FlashMessagesService,
      private router: Router
    ) {
    }

    // Checks if user is logged in.
    getAuth() {
        return this.afAuth.authState.map(auth => auth);
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
                .then((userData) => {
                    resolve(userData);
                    this.flashMessage.show(`${data.email} logged in successfully!`, {
                        cssClass: 'alert-success',
                        timeout: 3500
                    });
                    this.router.navigate(['/admin/users']);
                })
                .catch((error) => {
                    reject(error);
                    this.flashMessage.show(error, {
                        cssClass: 'alert-danger',
                        timeout: 5000
                    });
                    this.router.navigate(['login']);
                });
        });
    }

    signup(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
                .then((userData) => {
                    resolve(userData);
                    this.flashMessage.show(`Email was sent to ${data.email}. Please confirm and login.`, {
                        cssClass: 'alert-success',
                        timeout: 3500
                    });
                    this.router.navigate(['/admin/login']);
                })
                .catch((error) => {
                    reject(error);
                    this.flashMessage.show(error, {
                        cssClass: 'alert-danger',
                        timeout: 5000
                    });
                    this.router.navigate(['/admin/signup']);
                });
        });
    }

    logout() {

        this.router.navigate(['/admin/login']);
    }
}
