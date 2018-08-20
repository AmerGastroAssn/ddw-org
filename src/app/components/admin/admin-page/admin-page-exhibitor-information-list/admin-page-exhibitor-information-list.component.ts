import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
  selector: 'ddw-admin-page-exhibitor-information-list',
  templateUrl: './admin-page-exhibitor-information-list.component.html',
  styleUrls: ['./admin-page-exhibitor-information-list.component.css']
})
export class AdminPageExhibitorInformationListComponent implements OnInit {
    exPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.exPage$ = this.adminPageService.getAllExhibitorPages();
    }
}
