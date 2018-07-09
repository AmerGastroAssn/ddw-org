import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    statusChange: any = new EventEmitter<any>();
    userCollection: AngularFirestoreCollection<User>;
    userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;
    users$: Observable<User[]>;
    uid: string;


    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private afAuth: AngularFireAuth
    ) {
    }


    getUsers(): Observable<User[]> {
        // Ref, and order by title
        this.userCollection = this.afs.collection(`users`,
          ref => ref.orderBy('displayName', 'asc')
        );
        // Gets array of users along with their uid.
        return this.userCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as User;
                           data.uid = a.payload.doc.id;
                           return data;
                       });
                   });
    }

    addUser(newUser: User) {
        const usersCollection = this.afs.collection<User>('users');
        usersCollection.add(newUser)
                       .then((user) => this.router.navigate(['/admin/users']))
                       .catch((error) => console.log(`ERROR~au: `, error));
    }

    getUser(id: string): Observable<User> {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        this.user = this.userDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as User;
                data.uid = action.payload.id;
                return data;
            }
        });

        return this.user;
    }

    updateUser(updatedUser, id: string): void {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        this.userDoc.update(updatedUser)
            .then((user) => this.router.navigate([`/admin/users/${id}`]))
            .catch((error) => console.log(`ERROR~au: `, error));
    }

    deleteUser(id: string): void {
        this.userDoc = this.afs.doc<User>(`users/${id}`);
        if (confirm(`Are you sure you want to delete this user? This is irreversible.`)) {
            this.userDoc.delete()
                .then((user) => this.router.navigate([`/admin/users`]))
                .catch((error) => console.log(`ERROR~au: `, error));
        }
    }
}
