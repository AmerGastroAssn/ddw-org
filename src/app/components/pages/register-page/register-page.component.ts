import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Page } from '../../../models/Page';
import { AdminPageService } from '../../../services/admin-page.service';

@Component({
    selector: 'ddw-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
    pages$: Observable<Page[]>;


    constructor(public adminPageService: AdminPageService) {
    }

    ngOnInit() {
        this.pages$ = this.adminPageService.getAllRegisterPages();
    }

}
