import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { User } from '../../../../models/User';
import { AuthService } from '../../../../services/auth.service';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-list',
    templateUrl: './admin-page-list.component.html',
    styleUrls: ['./admin-page-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({opacity: 0}),
                animate(500 )
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(300, style({opacity: 0})))
        ])
    ]
})
export class AdminPageListComponent implements OnInit {
    page$: Observable<Page[]>;
    pageList: Observable<Page[]>;
    page: Page;
    user: User;
    uid: string;
    id: string;
    showListToggle = true;
    color = 'primary';

    constructor(
      private readonly adminPageService: AdminPageService,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.page$ = this.adminPageService.getPages();
        this.user = this.authService.getProfile();
        this.pageList = this.adminPageService.getAllPages();

        // Get Page uid
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
            }
        });
    }

    toggleListCardView() {
        this.showListToggle = !this.showListToggle;
    }

}
