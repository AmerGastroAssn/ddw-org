import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    pages$: Observable<Page[]>;


    constructor(private pageService: PageService) {
    }

    ngOnInit() {
        this.pages$ = this.pageService.getRegisterPages();
        console.log(this.pages$);
    }

}
