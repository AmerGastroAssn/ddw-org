import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { FeaturedPost } from '../../../../../models/FeaturedPost';
import { AdminFeaturedPostService } from '../../../../../services/admin-featured-post.service';
import { AdminImageService } from '../../../../../services/admin-image.service';
import { AdminPageService } from '../../../../../services/admin-page.service';
import { AdminSettingsService } from '../../../../../services/admin-settings.service';
import { AuthService } from '../../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-featured-blog-posts-edit',
    templateUrl: './admin-featured-blog-posts-edit.component.html',
    styleUrls: ['./admin-featured-blog-posts-edit.component.css']
})
export class AdminFeaturedBlogPostsEditComponent implements OnInit {
    postForm1: FormGroup;
    postForm2: FormGroup;
    postForm3: FormGroup;
    post1: FeaturedPost;
    post2: FeaturedPost;
    post3: FeaturedPost;

    // Post 1
    photoURL: string;
    body: string;
    linkText: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;
    disableAdminOnNew: boolean;
    // State for dropzone CSS toggling
    isHovering: boolean;
    isInvalid: boolean;
    value: any;

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private postService: AdminFeaturedPostService,
      private authService: AuthService,
      private storage: AngularFireStorage,
      private afs: AngularFirestore,
      private sbAlert: MatSnackBar,
      private settingsService: AdminSettingsService,
      private imageService: AdminImageService,
    ) {

    }

    // For Form Validations
    get f1() {
        return this.postForm1.controls;
    }

    get f2() {
        return this.postForm2.controls;
    }

    get f3() {
        return this.postForm3.controls;
    }

    ngOnInit() {
        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;
        // Get Post 1
        this.postService.getPost1().subscribe((post) => {
            // Post 1

            if (post !== null) {
                this.post1 = post;

                // Post1 Form:
                this.postForm1 = this.fb.group({
                    $key: [this.post1.$key],
                    uid: [this.post1.uid],
                    orderNumber: [this.post1.orderNumber],
                    body: [this.post1.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.post1.photoURL, Validators.required],
                    linkText: [this.post1.linkText, Validators.required],
                    url: [this.post1.url, Validators.required],
                });

                this.$key = this.postForm1.value.$key;
                this.uid = this.postForm1.value.uid;
                this.orderNumber = this.postForm1.value.orderNumber;
                this.body = this.postForm1.value.body;
                this.photoURL = this.postForm1.value.photoURL;
                this.linkText = this.postForm1.value.linkText;
                this.url = this.postForm1.value.url;
            }
        });

        // Get Post 2
        this.postService.getPost2().subscribe((post) => {
            if (post !== null) {
                this.post2 = post;

                // Post1 Form:
                this.postForm2 = this.fb.group({
                    $key: [this.post2.$key],
                    uid: [this.post2.uid],
                    orderNumber: [this.post2.orderNumber],
                    body: [this.post2.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.post2.photoURL, Validators.required],
                    linkText: [this.post2.linkText, Validators.required],
                    url: [this.post2.url, Validators.required],
                });

                this.$key = this.postForm2.value.$key;
                this.uid = this.postForm2.value.uid;
                this.orderNumber = this.postForm2.value.orderNumber;
                this.body = this.postForm2.value.body;
                this.photoURL = this.postForm2.value.photoURL;
                this.linkText = this.postForm2.value.linkText;
                this.url = this.postForm2.value.url;
            }
        });

        // Get Post 3
        this.postService.getPost3().subscribe((post) => {
            if (post !== null) {
                this.post3 = post;

                // Post1 Form:
                this.postForm3 = this.fb.group({
                    $key: [this.post3.$key],
                    uid: [this.post3.uid],
                    orderNumber: [this.post3.orderNumber],
                    body: [this.post3.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(20)
                           ])
                    ],
                    photoURL: [this.post3.photoURL, Validators.required],
                    linkText: [this.post3.linkText, Validators.required],
                    url: [this.post3.url, Validators.required],
                });

                this.$key = this.postForm3.value.$key;
                this.uid = this.postForm3.value.uid;
                this.orderNumber = this.postForm3.value.orderNumber;
                this.body = this.postForm3.value.body;
                this.photoURL = this.postForm3.value.photoURL;
                this.linkText = this.postForm3.value.linkText;
                this.url = this.postForm3.value.url;
            }
        });


    }

    onUpdatePost1(formData) {
        this.postService.updatePost1(formData);
        this.postForm1.reset(this.postService.getPost1());
    }

    onUpdatePost2(formData) {
        this.postService.updatePost2(formData);
        this.postForm2.reset(this.postService.getPost2());
    }

    onUpdatePost3(formData) {
        this.postService.updatePost3(formData);
        this.postForm3.reset(this.postService.getPost3());
    }


}
