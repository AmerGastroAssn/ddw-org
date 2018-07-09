import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/User';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    statusChange: any = new EventEmitter<any>();
    usersCollection: AngularFirestoreCollection<User>;
    users: Observable<User[]>;
    user: Observable<User>;
    userDoc: AngularFirestoreDocument<User>;
    currentUser: Observable<User>;
    uid: string;
    admin: boolean;

    constructor(
      private afAuth: AngularFireAuth,
      private flashMessage: FlashMessagesService,
      private router: Router,
      private route: ActivatedRoute,
      private afs: AngularFirestore,
    ) {
        this.usersCollection = afs.collection<User>('users');
        this.users = this.usersCollection.valueChanges();
        // this.uid = this.route.snapshot.params['id'];
        // this.uid = this.afAuth.auth.currentUser.uid;
        // console.log(this.);

        //// Get auth data, then get firestore user document || null
        this.user = this.afAuth.authState.pipe(
          switchMap(user => {
              if (user) {
                  return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
              } else {
                  return of(null);
              }
          })
        );


    }

    // Checks if user is logged in.
    getAuth() {
        return this.afAuth.authState.map(auth => auth);
    }

    // Gets Firebase UserToken and stores in browser app storage.
    currentUserToken(): any {
        return this.afAuth.auth.currentUser.getIdToken(false)
                   .then(idToken => {
                       return localStorage.setItem('userToken', idToken);
                   })
                   .catch(error => {
                       return error;
                   });
    }

    // Pulls the databaseUser's info as a promise.
    getUserFromDatabase(uid) {
        this.afAuth.authState.subscribe(auth => {
            if (auth) {
                this.currentUser = uid;
            }
        });
    }

    // Sets the databaseUsers's info.
    setUserInLocalStorage(userFromDatabase) {
        localStorage.setItem('user', JSON.stringify(userFromDatabase));
        this.statusChange.emit(userFromDatabase);
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
                .then((userData) => {
                    this.currentUserToken();
                    this.flashMessage.show(`${data.email} logged in successfully!`, {
                        cssClass: 'alert-success',
                        timeout: 1500
                    });
                    this.router.navigate(['/admin/users']);
                    return userData;
                })
                .then((userData) => {
                    if (userData) {
                        // this.afs.doc<User>(`users/${data.uid}`).valueChanges();
                        this.setUserInLocalStorage(userData);
                    } else {
                        console.log('userData was not found.');
                    }
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

    emailSignup(userData) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
                   .then(() => {
                       return this.setUserData(userData) // create initial user document
                                  .then(() => {
                                      this.flashMessage.show(`You are signed up and logged in successfully!`, {
                                          cssClass: 'alert-success',
                                          timeout: 2500
                                      });
                                      this.router.navigate(['/admin/login']);
                                  })
                                  .then(() => {
                                      if (userData) {
                                          this.setUserInLocalStorage(userData);
                                      } else {
                                          console.log('userData was not found.');
                                      }
                                  });
                   })
                   .catch(error => {
                       this.flashMessage.show(error, {
                           cssClass: 'alert-danger',
                           timeout: 5000
                       });
                       this.router.navigate(['/admin/signup']);
                   });
    }


    logout() {
        this.afAuth.auth.signOut()
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('userToken');
                this.flashMessage.show(`Logging you out!`, {
                    cssClass: 'alert-info',
                    timeout: 700
                });
                this.router.navigate(['/admin/login']);
            })
            .catch((error) => {
                this.flashMessage.show(error, {
                    cssClass: 'alert-warning',
                    timeout: 3500
                });
                console.log(`ERROR~l: `, error);
            });
    }

    private updateUserData(user) {
        const tempId = this.afs.createId();
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: tempId,
            email: user.email,
            password: user.password,
            isOnline: user.isOnline,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };

        return userRef.set(data, { merge: true });

    }

    private setUserData(user) {
        const tempId = this.afs.createId();
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${tempId}`);

        const data: User = {
            uid: tempId,
            email: user.email,
            password: user.password,
            isOnline: user.isOnline,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };
        return userRef.set(data);


    }
}
