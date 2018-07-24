import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/User';
import { UserService } from './user.service';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    statusChange: any = new EventEmitter<any>();
    usersCollection: AngularFirestoreCollection<User>;
    users$: Observable<User[]>;
    currentUser;
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


    constructor(
      private afAuth: AngularFireAuth,
      private flashMessage: FlashMessagesService,
      private router: Router,
      private route: ActivatedRoute,
      private afs: AngularFirestore,
      private userService: UserService,
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
                                     return this.uid = user.uid;
                                     // this.updateOnConnect();
                                     // this.setOffline();
                                 }
                             });
        // Sets user in browser local storage.
        this.statusChange.subscribe(userData => {
            if (userData) {
                this.$key = userData.$key;
                this.uid = userData.uid;
                this.email = userData.email;
                this.title = userData.title;
                this.password = userData.password;
                this.photoURL = userData.photoURL;
                this.loginDate = Date.now();
                this.isOnline = userData.isOnline = true;
                this.admin = userData.admin;
                this.displayName = userData.displayName;
            } else {
                this.displayName = null;
                this.email = null;
                this.uid = null;
                this.isOnline = false;
            }
        });

        // this.users$.subscribe((userArr) => {
        //     userArr.forEach((userInfo) => {
        //         if (this.afAuth.auth.currentUser.email === userInfo.email) {
        //             // console.log(userInfo);
        //             return this.currentUser =             userInfo;
        //         }
        //     });
        // });
    }


    isLoggedIn() {
        firebase.auth().onAuthStateChanged((userData) => {
            // if logged in.
            if (userData && userData.emailVerified) {
                this.loggedIn = true;
                const user = this.getProfile();
                if (user && user.uid) {
                    this.uid = userData.uid;
                    this.email = userData.email;
                    this.photoURL = userData.photoURL;
                    this.loginDate = Date.now();
                    this.displayName = userData.displayName;
                }
            } else {
                this.loggedIn = false;
                // Logs FB user out if not logged in app.
                firebase.auth().signOut();
                // removes from local storage
            }
        });
    }

    // Used to get userData in browser memory.
    getProfile() {
        if (this.fbUser$) {
            const user = localStorage.getItem('user');
            return JSON.parse(user);
        }
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
    // getUserFromDatabase(uid) {
    //     this.afAuth.authState.subscribe(auth => {
    //         if (auth) {
    //             this.currentUser$ = uid;
    //         }
    //     });
    // }

    // Sets the databaseUsers's info.
    setUserInLocalStorage(userFromLogin) {
        localStorage.setItem('user', JSON.stringify(userFromLogin));
        this.statusChange.emit(userFromLogin);
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
                                }
                            });
                        });
                    }
                    this.currentUserToken();
                    this.flashMessage.show(`${data.email} logged in successfully!`, {
                        cssClass: 'alert-success',
                        timeout: 1500
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
                       return this.setUserData(userData) // create initial user document
                                  .then(() => {
                                      this.flashMessage.show(`You are signed up and logged in successfully!`, {
                                          cssClass: 'alert-success',
                                          timeout: 2500
                                      });
                                      this.router.navigate(['/admin/login']);
                                  });
                   })
                   .catch(error => {
                       console.log(`Error~eS:`, error);
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

    resetPassword(formData: any) {
        const auth = firebase.auth();
        return auth.sendPasswordResetEmail(formData)
                   .then(() => {
                       this.flashMessage.show(`Email confirmation was sent!`, {
                           cssClass: 'alert-success',
                           timeout: 2500
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
                               this.flashMessage.show(`${newUser.displayName} was Created`, {
                                   cssClass: 'alert-success',
                                   timeout: 1500
                               });
                           })
                           .catch((error) => {
                               console.log(`ERROR~au: `, error);
                               this.flashMessage.show(`Something went wrong, user was NOT created.`, {
                                   cssClass: 'alert-danger',
                                   timeout: 2000
                               });
                           });
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
