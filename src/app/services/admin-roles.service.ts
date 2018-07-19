import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/operators';
import { Roles, User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class AdminRolesService {
    user$: Observable<User>;

    // roles: Roles = {
    //     subscriber: true,
    //     editor: true,
    //     admin: true
    // };

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
    ) {
        // if (localStorage.getItem('roles') !== null) {
        //     this.roles = JSON.parse(localStorage.getItem('roles'));
        // }

        this.user$ = afAuth.authState
                           .switchMap(user => {
                               if (user) {
                                   return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                               } else {
                                   return null;
                               }
                           });
    }

    getAdminRoles(): Roles {
        return this.roles;
    }

    saveRoles(roles: Roles) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    // User roles. used with *ngIf="auth.canEdit(user)"
    canRead(user: User): boolean {
        const allowed = ['admin', 'editor', 'subscriber'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'editor'];
        return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }


    // determines if user has matching role
    checkAuthorization(user: User, allowedRoles: string[]): boolean {
        if (!user) {
            return false;
        }
        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true;
            }
        }
        return false;
    }


}
