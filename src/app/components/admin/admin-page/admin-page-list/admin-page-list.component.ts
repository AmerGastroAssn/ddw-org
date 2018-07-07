import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-admin-page-list',
    templateUrl: './admin-page-list.component.html',
    styleUrls: ['./admin-page-list.component.css']
})
export class AdminPageListComponent implements OnInit {
    page$: Observable<Page[]>;

    constructor(
      private readonly pageService: PageService
    ) {
    }

    ngOnInit() {
        this.page$ = this.pageService.getPages();
    }

}
