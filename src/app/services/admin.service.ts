import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../models/User';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AdminService {
    user: User;
    uid: string;

    constructor(
      private afAuth: AngularFireAuth,
      private afs: AngularFirestore,
      private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    ifAdminUser() {
        if (this.currentUser) {
            return this.currentUser.admin === true;
        } else {
            return false;
        }
    }
}
