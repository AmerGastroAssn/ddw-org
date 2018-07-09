import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
    user$: Observable<User>;
    fbUser$: Observable<firebase.User>;
    userDoc: AngularFirestoreDocument<User>;
    currentUser$: Observable<User>;
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


        //// Get auth data, then get firestore user document || null
        // this.user = this.afAuth.authState.pipe(
        //   switchMap(user => {
        //       if (user) {
        //           return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        //       } else {
        //           return of(null);
        //       }
        //   })
        // );

        this.fbUser$ = afAuth.authState
                             .do((user) => {
                                 if (user) {
                                     this.uid = user.uid;
                                     // this.updateOnConnect();
                                     // this.setOffline();
                                 }
                             });
        // Sets user in browser.
        this.userService.statusChange.subscribe(userData => {
            if (userData) {
                this.$key = userData.$key;
                this.uid = userData.uid;
                this.displayName = userData.displayName;
                this.email = userData.email;
                this.password = userData.password;
                this.photoURL = userData.photoURL;
                this.loginDate = Date.now();
                this.isOnline = userData.isOnline = true;
                this.admin = userData.admin;
                this.title = userData.title;

            } else {
                this.displayName = null;
                this.email = null;
                this.uid = null;
            }
        });

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
                this.currentUser$ = uid;
            }
        });
    }

    // Sets the databaseUsers's info.
    setUserInLocalStorage(userFromLogin) {
        console.log('userFromDatabase', userFromLogin);
        localStorage.setItem('user', JSON.stringify(userFromLogin));
        this.statusChange.emit(userFromLogin);
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
                        this.users$.subscribe((userArr) => {
                            userArr.forEach((userInfo) => {
                                if (userData.user.email === userInfo.email) {
                                    console.log(userInfo);
                                    this.setUserInLocalStorage(userInfo);
                                }
                            });
                        });

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
            $key: user.$key,
            uid: user.$key,
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
            $key: user.$key,
            uid: user.$key,
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
