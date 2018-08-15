import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ddw-admin-featured-blog-posts',
    templateUrl: './admin-featured-blog-posts.component.html',
    styleUrls: ['./admin-featured-blog-posts.component.css']
})
export class AdminFeaturedBlogPostsComponent implements OnInit {
    @Input() post;
    photoURL: string;
    body: string;
    linkText: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;

    constructor() {
    }

    ngOnInit() {
    }

}
