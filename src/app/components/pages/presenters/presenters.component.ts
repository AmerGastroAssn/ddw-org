import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Page } from '../../../models/Page';
import { AdminPageService } from '../../../services/admin-page.service';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'ddw-presenters',
  templateUrl: './presenters.component.html',
  styleUrls: ['./presenters.component.css']
})
export class PresentersComponent implements OnInit {
    page: Page;
    id: string;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
    ) {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        // this.pages$ = this.pageService.getRegisterPages();

        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
                console.log('this.page', this.page);
            }
        });
    }

}
