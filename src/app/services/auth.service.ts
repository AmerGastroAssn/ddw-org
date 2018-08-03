import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { User } from '../models/User';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    statusChange: any = new EventEmitter<any>();
    usersCollection: AngularFirestoreCollection<User>;
    users$: Observable<User[]>;
    currentUserId: string;
    user: User;
    fbUser$: Observable<firebase.User>;
    userDoc: AngularFirestoreDocument<User>;
    loggedIn: boolean;
    $key: string;
    uid: string;
    admin: boolean;
    displayName: string;
    email: string;
    password: string;
    photoURL: string;
    loginDate: number = Date.now();
    isOnline: boolean;
    title: string;
    isAdmin: boolean;


    constructor(
      private afAuth: AngularFireAuth,
      private flashMessage: FlashMessagesService,
      private router: Router,
      private route: ActivatedRoute,
      private afs: AngularFirestore,
      private userService: UserService,
      public sbAlert: MatSnackBar,
    ) {
        this.usersCollection = afs.collection<User>('users');
        this.users$ = this.usersCollection.snapshotChanges()
                          .map(actions => {
                              return actions.map(action => ({
                                  $key: action.payload.doc.id, ...action.payload.doc.data()
                              }));
                          });


        this.fbUser$ = afAuth.authState
                             .do((user) => {
                                 if (user) {
                                     return this.currentUserId = user.uid;
                                     // this.updateOnConnect();
                                     // this.setOffline();
                                 }
                             });

        // Watches/Sets user in browser local storage.
        this.statusChange.subscribe(userData => {
            if (userData) {
                this.$key = userData.$key;
                this.uid = userData.uid;
                this.email = userData.email;
                this.title = userData.title;
                // this.password = userData.password;
                this.photoURL = userData.photoURL;
                this.loginDate = Date.now();
                this.isOnline = userData.isOnline;
                this.admin = userData.admin;
                this.displayName = userData.displayName;
            } else {
                this.displayName = null;
                this.email = null;
                this.uid = null;
                this.isOnline = false;
            }
        });
    }

    updateOnConnect() {

    }

    isLoggedIn() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    // Used to get userData in browser memory.
    getProfile() {
        const user = localStorage.getItem('user');
        return JSON.parse(user);
    }

    // Checks if user is logged in.
    getAuth() {
        return this.afAuth.authState.map(auth => auth);
    }

    // Checks if User is logged in, and if it's an admin
    async getAdminUserVals() {
        const loggedInUser = await this.isLoggedIn();
        if (loggedInUser) {
            this.users$.subscribe((userArr) => {
                userArr.forEach((userInfo) => {
                      if (this.afAuth.auth.currentUser.email === userInfo.email) {
                          if (userInfo.admin) {
                              return userInfo;
                          } else {
                              console.log('Admin User not found');
                          }
                      }
                  }
                );
            });
        }
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

    // Sets the databaseUsers's info.
    setUserInLocalStorage(userData) {
        this.statusChange.emit(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    }

    removeUserFromLocalStorage() {
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
    }

    login(data) {
        return new Promise((resolve, reject) => {
            this.afAuth.auth.signInWithEmailAndPassword(data.email, data.password)
                .then((userData) => {
                    if (userData) {
                        this.users$.subscribe((userArr) => {
                            userArr.forEach((userInfo) => {
                                if (userData.user.email === userInfo.email) {
                                    this.setUserInLocalStorage(userInfo);
                                    this.setUserToOnline(userInfo);
                                }
                            });
                        });
                    }
                    this.currentUserToken();
                    this.sbAlert.open('Logged in successfully.', 'Dismiss', {
                        duration: 3000,
                        verticalPosition: 'bottom',
                        panelClass: ['snackbar-success']
                    });
                })
                .then(() => this.router.navigate(['/admin/users']))
                .catch((error) => {
                    reject(error);
                    this.flashMessage.show(error, {
                        cssClass: 'alert-danger',
                        timeout: 5000
                    });
                    this.router.navigate(['/admin/login']);
                });
        });
    }

    emailSignup(userData) {
        return this.afAuth.auth.createUserWithEmailAndPassword(userData.email, userData.password)
                   .then(() => {
                       return this.setUserData(userData);
                   })
                   .catch(error => {
                       this.router.navigate(['/admin/signup']);
                   });
    }

    logout(user) {
        this.afAuth.auth.signOut()
            .then(() => {
                this.removeUserFromLocalStorage();

                this.sbAlert.open('Logging you out.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-info']
                });
                this.router.navigate(['/admin/login']);
            })
            .then(() => this.setUserToOffline(user))
            .catch((error) => {
                this.flashMessage.show(error, {
                    cssClass: 'alert-warning',
                    timeout: 3500
                });
                console.log(`ERROR~l: `, error);
            });

    }

    resetPassword(formData: any) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(formData)
                   .then(() => {
                       this.sbAlert.open('Email confirmation was sent to your email.', 'Dismiss', {
                           duration: 3000,
                           verticalPosition: 'bottom',
                           panelClass: ['snackbar-info']
                       });
                       console.log('Email confirmation was sent!');
                       this.router.navigate(['/admin/login']);
                   })
                   .catch((error) => {
                       this.flashMessage.show(error, {
                           cssClass: 'alert-danger',
                           timeout: 2500
                       });
                       console.log(error);
                   });
    }

    addUser(newUser: User) {
        return this.afAuth.auth.createUserWithEmailAndPassword(newUser.email, newUser.password)
                   .then(() => {
                       this.setNewUserData(newUser)
                           .then(() => {
                               this.router.navigate([`/admin/users`]);
                           })
                           .catch((error) => {
                               console.log(`ERROR~au: `, error);
                               this.sbAlert.open(error, 'Dismiss', {
                                   duration: 3000,
                                   verticalPosition: 'bottom',
                                   panelClass: ['snackbar-danger']
                               });
                           });
                   });
    }

    setUserToOffline(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            uid: user.uid,
            email: user.email,
            password: user.password,
            isOnline: false,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };


        return userRef.set(data)
                      .then(() => {
                          console.log('user Data offline:', data);
                      })
                      .catch((error) => {
                          console.log('User not set in local storage:', error);
                      });
    }

    private setUserToOnline(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

        const data: User = {
            $key: user.uid,
            uid: user.uid,
            email: user.email,
            password: user.password,
            isOnline: true,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };

        return userRef.set(data)
                      .then(() => {
                          console.log('User is logged in.');
                          console.log('user Data:', data);
                      })
                      .catch((error) => {
                          console.log('User not set in local storage:', error);
                      });
    }

    // Sets user but also in local storage.
    private setUserData(user) {
        // const userId = this.userService.currentUserId;
        const new$key = this.afs.createId();
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${new$key}`);

        const data: User = {
            $key: new$key,
            uid: new$key,
            email: user.email,
            password: user.password,
            isOnline: user.isOnline,
            loginDate: user.loginDate,
            photoURL: user.photoURL,
            admin: user.admin,
            title: user.title,
            displayName: user.displayName,
        };

        return userRef.set(data)
                      .then(() => {
                          this.setUserInLocalStorage(data);
                          this.currentUserToken();
                      })
                      .catch((error) => {
                          console.log('User not set in local storage:', error);
                      });
    }

    // Without setting in local storage
    private setNewUserData(user) {
        const new$key = this.afs.createId();
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${new$key}`);
        const data: User = {
            $key: new$key,
            uid: new$key,
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
