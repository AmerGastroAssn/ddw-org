import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(private db: AngularFirestore) {
    }

    getAllRegisterPages(): Observable<any[]> {
        return this.db.collection('pages').valueChanges();
    }

}
