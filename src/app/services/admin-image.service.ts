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
    category: string;


    constructor(
      private afs: AngularFirestore,
      private authService: AuthService,
    ) {
        this.currentUser = this.authService.getProfile();
    }

    getImages(start, end) {
        return this.afs.collection('images',
          (ref) => ref.limit(10)
                      .orderBy('imageName')
                      .startAt(start).endAt(end)
        )
                   .valueChanges();
    }

    getImageByCreatedAt(): Observable<Image[]> {
        this.imageCollection = this.afs.collection('images',
          ref => ref.orderBy('createdAt', 'desc').limit(25)
        );
        return this.imageCollection.valueChanges();
    }

    getImageBySortAmount(amount): Observable<Image[]> {
        this.imageCollection = this.afs.collection('images',
          ref => ref.orderBy('createdAt', 'desc').limit(amount)
        );
        return this.imageCollection.valueChanges();
    }


    setImage(downloadURL, fileName) {
        const new$key = this.afs.createId();
        const currentDate = Date.now();

        const imageRef: AngularFirestoreDocument<Image> = this.afs.doc(`images/${new$key}`);
        const data: Image = {
            $key: new$key,
            uid: new$key,
            author: this.currentUser.email || '',
            category: '',
            fileName: fileName,
            imageName: fileName,
            createdAt: currentDate,
            url: downloadURL
        };

        return imageRef.set(data)
                       .then(() => console.log('Image', data))
                       .catch((error) => console.log(`ERROR~sI: `, error));
    }
}
