import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private db: AngularFirestore) {
    }

    getAllUsers(): Observable<any[]> {
        return this.db.collection('users').valueChanges();
    }
}
