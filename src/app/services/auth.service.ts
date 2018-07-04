import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;

    constructor(
      private afAuth: AngularFireAuth,
      private flashMessage: FlashMessagesService,
      private router: Router,
      private afs: AngularFirestore
    ) {
        this.usersCollection = afs.collection<User>('users');
        this.users = this.usersCollection.valueChanges();
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
                    this.usersCollection.add(data);
                    this.flashMessage.show(`You are signed up and logged in successfully!`, {
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
