import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { User } from '../../../../../../models/User';
import { AuthService } from '../../../../../../services/auth.service';
import { CallToAction } from '../../../models/call-to-action';
import { CallToActionService } from '../../../services/call-to-action.service';

@Component({
    selector: 'ddw-call-to-action-list',
    templateUrl: './call-to-action-list.component.html',
    styleUrls: ['./call-to-action-list.component.css'],
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
export class CallToActionListComponent implements OnInit {
    cta$: Observable<CallToAction[]>;
    ctaList: any;
    cta: CallToAction;
    user: User;
    id: string;
    // Search
    searchTerm: string;
    startAt = new Subject();
    endAt = new Subject();
    startObs = this.startAt.asObservable();
    endObs = this.endAt.asObservable();
    lastKeyPress = 0;

    constructor(
      private ctaService: CallToActionService,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.cta$ = this.ctaService.getAllCtas();
        this.ctaService.getAllCtas()
            .subscribe((ctas) => this.ctaList = ctas);
        Observable.combineLatest(this.startObs, this.endObs)
                  .subscribe((value) => {
                      this.ctaService.getSearchedCtas(value[0], value[1])
                          .subscribe((pages) => {
                              this.ctaList = pages;
                          });
                  });


        this.id = this.route.snapshot.params['id'];
        // Get each user's details
        this.ctaService.getCta(this.id).subscribe((cta) => {
            if (cta !== null) {
                this.cta = cta;
            }
        });
    }


    search($event) {
        const query = $event.target.value.toLowerCase();
        if (query !== '') {
            this.startAt.next(query);
            this.endAt.next(`${query}\uf8ff`);
        } else {
            this.ctaService.getAllCtas()
                .subscribe((allCTAs) => this.ctaList = allCTAs);
        }
    }

}
