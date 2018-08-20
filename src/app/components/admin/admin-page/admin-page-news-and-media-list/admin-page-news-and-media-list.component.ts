import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-news-and-media-list',
    templateUrl: './admin-page-news-and-media-list.component.html',
    styleUrls: ['./admin-page-news-and-media-list.component.css']
})
export class AdminPageNewsAndMediaListComponent implements OnInit {
    newsPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.newsPage$ = this.adminPageService.getAllNewsPages();
    }
}
