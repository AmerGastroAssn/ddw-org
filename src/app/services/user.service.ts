import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { User } from 'firebase';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    userCollection: AngularFirestoreCollection<User>;
    userDoc: AngularFirestoreDocument<User>;
    user: Observable<User>;


    constructor(
      private afs: AngularFirestore,
      private router: Router
    ) {
        // Ref, and order by title
        this.userCollection = this.afs.collection(`users`,
          ref => ref.orderBy('displayName', 'asc')
        );
    }

    getUsers(): Observable<User[]> {
        // Gets array of users along with their uid.
        return this.userCollection.snapshotChanges()
                   .map((changes) => {
                       return changes.map((a) => {
                           const data = a.payload.doc.data() as User;
                           data.uid = a.payload.doc.id;
                           console.log(data);
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
}
