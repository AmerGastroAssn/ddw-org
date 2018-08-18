import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';
import * as _ from 'lodash';

@Component({
    selector: 'ddw-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    registerPages$: Page[];
    attendeePlanningPages$: Observable<Page[]>;
    educationPages$: Observable<Page[]>;
    exhibitorInfoPages$: Observable<Page[]>;
    newsAndMediaPages$: Observable<Page[]>;
    presentersPages$: Observable<Page[]>;

    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.pageService.getRegisterPages()
            .subscribe((pageArr) => {
                this.registerPages$ = _.orderBy(pageArr, ['sortOrder'], ['desc']);
            });

        this.attendeePlanningPages$ = this.pageService.getAttendeePlanningPages();
        this.educationPages$ = this.pageService.getEducationPages();
        this.exhibitorInfoPages$ = this.pageService.getExhibitorInfoPages();
        this.newsAndMediaPages$ = this.pageService.getNewsAndMediaPages();
        this.presentersPages$ = this.pageService.getPresenterPages();
    }

}
