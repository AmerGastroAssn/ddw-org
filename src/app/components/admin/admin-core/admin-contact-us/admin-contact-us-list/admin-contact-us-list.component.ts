import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactForm } from '../../../../../models/ContactForm';
import { ContactFormService } from '../../../../../services/contact-form.service';

@Component({
    selector: 'ddw-admin-contact-us-list',
    templateUrl: './admin-contact-us-list.component.html',
    styleUrls: ['./admin-contact-us-list.component.css'],
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
export class AdminContactUsListComponent implements OnInit {
    contacts$: Observable<ContactForm[]>;

    constructor(
      private contactFormService: ContactFormService,
    ) {
    }

    ngOnInit() {
        this.contacts$ = this.contactFormService.getAllContactForms();
    }
}
