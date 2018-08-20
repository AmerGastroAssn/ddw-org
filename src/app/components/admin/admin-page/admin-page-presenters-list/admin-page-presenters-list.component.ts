import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-presenters-list',
    templateUrl: './admin-page-presenters-list.component.html',
    styleUrls: ['./admin-page-presenters-list.component.css']
})
export class AdminPagePresentersListComponent implements OnInit {
    presPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.presPage$ = this.adminPageService.getAllPresenterPages();
    }
}
