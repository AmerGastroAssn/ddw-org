import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    registerPages$: Observable<Page[]>;
    attendeePlanningPages$: Observable<Page[]>;
    educationPages$: Observable<Page[]>;
    exhibitorInfoPages$: Observable<Page[]>;
    newsAndMediaPages$: Observable<Page[]>;
    presentersPages$: Observable<Page[]>;

    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.registerPages$ = this.pageService.getRegisterPages();
        this.attendeePlanningPages$ = this.pageService.getAttendeePlanningPages();
        this.educationPages$ = this.pageService.getEducationPages();
        this.exhibitorInfoPages$ = this.pageService.getExhibitorInfoPages();
        this.newsAndMediaPages$ = this.pageService.getNewsAndMediaPages();
        this.presentersPages$ = this.pageService.getPresenterPages();
    }

}
