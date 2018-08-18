import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { PageService } from '../../../services/page.service';

@Component({
  selector: 'ddw-exhibitor-information',
  templateUrl: './exhibitor-information.component.html',
  styleUrls: ['./exhibitor-information.component.css']
})
export class ExhibitorInformationComponent implements OnInit {
    page: Page;
    url: string;
    cards$: Observable<Card[]>;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
    ) {
    }

    ngOnInit() {
        this.cards$ = this.cardService.getAllCards();

        // Gets $key which is a Slug
        this.route.params.switchMap((params: Params) => {
            this.url = params['id'];

            return this.adminPageService.getPage(this.url);
        })
            .subscribe((page) => {
                this.page = page;
            });
    }
}
