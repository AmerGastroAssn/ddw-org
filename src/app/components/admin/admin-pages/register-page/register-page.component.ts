import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../../../models/Page';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    registerPages$: Observable<Page[]>;

    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.registerPages$ = this.pageService.getAllRegisterPages();
    }

}
