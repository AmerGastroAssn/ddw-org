import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-details',
    templateUrl: './admin-page-details.component.html',
    styleUrls: ['./admin-page-details.component.css']
})
export class AdminPageDetailsComponent implements OnInit {
    id: string;
    page: Page;
    uid: string;

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
            }
        });
    }

    onDeletePage() {
        this.adminPageService.deletePage(this.page.uid);
    }

}
