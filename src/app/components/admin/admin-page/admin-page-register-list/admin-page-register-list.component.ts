import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-register-list',
    templateUrl: './admin-page-register-list.component.html',
    styleUrls: ['./admin-page-register-list.component.css']
})
export class AdminPageRegisterListComponent implements OnInit {
    regPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.regPage$ = this.adminPageService.getAllRegisterPages();
    }

}
