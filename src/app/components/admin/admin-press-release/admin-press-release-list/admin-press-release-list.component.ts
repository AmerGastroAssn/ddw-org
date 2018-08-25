import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PressRelease } from '../../../../models/PressRelease';
import { User } from '../../../../models/User';
import { AdminPressReleaseService } from '../../../../services/admin-press-release.service';
import { AuthService } from '../../../../services/auth.service';

@Component({
    selector: 'ddw-admin-press-release-list',
    templateUrl: './admin-press-release-list.component.html',
    styleUrls: ['./admin-press-release-list.component.css'],
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
export class AdminPressReleaseListComponent implements OnInit {
    pressRelease$: Observable<PressRelease[]>;
    pressReleaseList: Observable<PressRelease[]>;
    pressRelease: PressRelease;
    user: User;
    uid: string;
    id: string;
    color = 'primary';

    constructor(
      private readonly adminPressReleaseService: AdminPressReleaseService,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        this.pressRelease$ = this.adminPressReleaseService.getPressReleases();
        // Get User from local storage.
        this.user = this.authService.getProfile();
        this.pressReleaseList = this.adminPressReleaseService.getAllPressReleases();

        // Get PressRelease uid
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each Press Release's details
        this.adminPressReleaseService.getPressRelease(this.id).subscribe((pressRelease) => {
            if (pressRelease !== null) {
                this.pressRelease = pressRelease;
            }
        });
    }
}
