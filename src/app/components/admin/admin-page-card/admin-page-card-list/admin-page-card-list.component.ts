import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../../../../models/Card';
import { PagesCardService } from '../../../../services/pages-card.service';

@Component({
    selector: 'ddw-admin-page-card-list',
    templateUrl: './admin-page-card-list.component.html',
    styleUrls: ['./admin-page-card-list.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({ opacity: 1 })),

            // fade in when created. this could also be written as transition('void => *')
            transition(':enter', [
                style({ opacity: 0 }),
                animate(500)
            ]),

            // fade out when destroyed. this could also be written as transition('void => *')
            transition(':leave',
              animate(300, style({ opacity: 0 })))
        ])
    ]
})
export class AdminPageCardListComponent implements OnInit {
    pageCards$: Observable<Card[]>;

    constructor(
      private pageCardService: PagesCardService
    ) {
    }


    ngOnInit() {
        this.pageCards$ = this.pageCardService.getAllPageCards();
    }

}
