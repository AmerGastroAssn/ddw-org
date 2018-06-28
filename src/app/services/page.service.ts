import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../models/Page';

@Injectable({
    providedIn: 'root'
})
export class PageService {

    constructor(private readonly db: AngularFirestore) {
    }

    getAllRegisterPages(): Observable<Page[]> {
        return this.db.collection<Page>('pages').valueChanges();
    }

}
