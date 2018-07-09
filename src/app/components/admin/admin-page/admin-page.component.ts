import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'ddw-pages',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

    constructor(
      private authService: AuthService
    ) {
    }

    ngOnInit() {

    }

}
