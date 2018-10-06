import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Image } from '../models/Image';
import { User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AdminImageService {
    imageCollection: AngularFirestoreCollection<Image>;
    imageDoc: AngularFirestoreDocument<Image>;
    images$: Observable<Image[]>;
    currentUser: User;


    constructor(
      private afs: AngularFirestore,
      private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    getImages(): Observable<Image[]> {
        this.imageCollection = this.afs.collection(`images`,
          ref => ref.orderBy('createdAt', 'asc')
        );
        return this.afs.collection(`images`).valueChanges();
    }


    setImage(downloadURL, imageName) {
        const new$key = this.afs.createId();
        const currentDate = Date.now();

        const imageRef: AngularFirestoreDocument<Image> = this.afs.doc(`images/${new$key}`);
        const data: Image = {
            $key: new$key,
            uid: new$key,
            author: this.currentUser.email || '',
            imageName: imageName,
            createdAt: currentDate,
            url: downloadURL
        };

        return imageRef.set(data)
                       .then(() => console.log('Image', data))
                       .catch((error) => console.log(`ERROR~sI: `, error));
    }
}
