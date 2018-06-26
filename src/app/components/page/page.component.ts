import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../models/Page';
import { PageService } from '../../services/page.service';

@Component({
    selector: 'ddw-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {
    pages$: Observable<Page[]>;


    constructor(public pageService: PageService) {
    }

    ngOnInit() {
        this.pages$ = this.pageService.getAllPages();
    }

}
