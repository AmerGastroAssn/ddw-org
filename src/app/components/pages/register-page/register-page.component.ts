import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    pages$: Observable<Page[]>;


    constructor(public pageService: PageService) {
    }

    ngOnInit() {
        this.pages$ = this.pageService.getAllRegisterPages();
    }

}
