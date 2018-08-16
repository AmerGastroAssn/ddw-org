import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
    selector: 'ddw-admin-page-details',
    templateUrl: './admin-page-details.component.html',
    styleUrls: ['./admin-page-details.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({opacity: 0}),
                animate(600 )
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(600, style({opacity: 0})))
        ])
    ]
})
export class AdminPageDetailsComponent implements OnInit {
    id: string;
    page: Page;
    uid: string;

    constructor(
      private adminPageService: AdminPageService,
      private router: Router,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPageService.getPage(this.id).subscribe((page) => {
            if (page !== null) {
                this.page = page;
            }
        });
    }

    onDeletePage() {
        this.adminPageService.deletePage(this.page.uid);
    }

}
