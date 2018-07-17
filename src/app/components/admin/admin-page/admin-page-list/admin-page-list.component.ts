import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-admin-page-list',
    templateUrl: './admin-page-list.component.html',
    styleUrls: ['./admin-page-list.component.css']
})
export class AdminPageListComponent implements OnInit {
    page$: Observable<Page[]>;
    pageList: Observable<Page[]>;
    page: Page;
    user: User;
    uid: string;
    id: string;
    showListToggle = true;
    color = 'primary';

    constructor(
      private readonly pageService: PageService,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.page$ = this.pageService.getPages();
        this.user = this.authService.getProfile();
        this.pageList = this.pageService.getAllRegisterPages();

        // Get Page uid
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.pageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
            }
        });
    }

    toggleListCardView() {
        this.showListToggle = !this.showListToggle;
    }

}
