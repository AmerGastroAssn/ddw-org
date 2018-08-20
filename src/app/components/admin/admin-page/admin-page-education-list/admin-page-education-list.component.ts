import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
  selector: 'ddw-admin-page-education-list',
  templateUrl: './admin-page-education-list.component.html',
  styleUrls: ['./admin-page-education-list.component.css']
})
export class AdminPageEducationListComponent implements OnInit {
    edPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.edPage$ = this.adminPageService.getAllEducationPages();
    }
}
