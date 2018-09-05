import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { FeaturedPost } from '../models/FeaturedPost';


@Injectable({
    providedIn: 'root'
})
export class AdminFeaturedPostService {
    postCollection: AngularFirestoreCollection<FeaturedPost>;
    postDoc: AngularFirestoreDocument<FeaturedPost>;
    posts$: Observable<FeaturedPost[]>;
    post$: Observable<FeaturedPost>;
    $keyPost1: string;
    $keyPost2: string;
    $keyPost3: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.$keyPost1 = 'nzhGEzraVYuMkyaqnIlc';
        this.$keyPost2 = 'mniSfjeG1WR2Kx6ant92';
        this.$keyPost3 = '1hqdc3HM7CVputFXtJna';
    }

    getAllPosts(): Observable<FeaturedPost[]> {
        this.postCollection = this.afs.collection<FeaturedPost>('posts', ref => {
            return ref.orderBy('orderNumber');
        });
        return this.posts$ = this.postCollection.valueChanges();
    }


    /*------------------------------------------------
     GET POSTS
     ------------------------------------------------*/
    getPost1(): Observable<FeaturedPost> {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost1}`);
        this.post$ = this.postDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as FeaturedPost;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.post$;
    }

    getPost2(): Observable<FeaturedPost> {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost2}`);
        this.post$ = this.postDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as FeaturedPost;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.post$;
    }

    getPost3(): Observable<FeaturedPost> {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost3}`);
        this.post$ = this.postDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as FeaturedPost;
                data.$key = action.payload.id;
                return data;
            }
        });

        return this.post$;
    }

    /*------------------------------------------------
     UPDATE POSTS
     ------------------------------------------------*/
    updatePost1(updatedPost): void {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost1}`);

        this.postDoc.update(updatedPost)
            .then(() => {
                this.sbAlert.open('Post 1 was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Post updated', updatedPost);
            })
            .catch((error) => {
                this.sbAlert.open('Post 1 was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }


    updatePost2(updatedPost): void {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost2}`);

        this.postDoc.update(updatedPost)
            .then(() => {
                this.sbAlert.open('Post 2 was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Post updated', updatedPost);
            })
            .catch((error) => {
                this.sbAlert.open('Post 2 was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }


    updatePost3(updatedPost): void {
        this.postDoc = this.afs.doc<FeaturedPost>(`posts/${this.$keyPost3}`);

        this.postDoc.update(updatedPost)
            .then(() => {
                this.sbAlert.open('Post 3 was Saved!', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-success']
                });
                console.log('Post updated', updatedPost);
            })
            .catch((error) => {
                this.sbAlert.open('Post 3 was NOT Saved.', 'Dismiss', {
                    duration: 3000,
                    verticalPosition: 'bottom',
                    panelClass: ['snackbar-danger']
                });
                console.log(`ERROR~uM: `, error);
            });
    }
}
