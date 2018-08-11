import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import { Card } from '../../../models/Card';
import { Page } from '../../../models/Page';
import { AdminCardService } from '../../../services/admin-card.service';
import { AdminPageService } from '../../../services/admin-page.service';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
    page: Page;
    id: string;
    cards$: Observable<Card[]>;

    constructor(
      private pageService: PageService,
      private adminPageService: AdminPageService,
      private route: ActivatedRoute,
      private cardService: AdminCardService,
    ) {
        // Get id from url
        // this.id = this.route.snapshot.params['id'];

    }

    ngOnInit() {
        this.cards$ = this.cardService.getAllCards();
        // this.pages$ = this.pageService.getRegisterPages();

        // Get each user's details
        // this.page = this.pageService.getPage(this.id);

        this.route.params.switchMap((params: Params) => {
            this.id = params['id'];

            return this.adminPageService.getPage(this.id);
        })
            .subscribe((page) => {
                this.page = page;
            });


    }

    ngOnDestroy() {

    }

}
