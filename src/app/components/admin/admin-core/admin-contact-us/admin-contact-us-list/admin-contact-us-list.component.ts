import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    contacts: ContactForm[];
    contacts$: Observable<ContactForm[]>;
    contact: ContactForm;
    id: string;
    $key: string;
    selectedContactFilter = 'sentDate';
    sortOptions: any[];

    constructor(
      private contactFormService: ContactFormService,
      private route: ActivatedRoute,
    ) {
        this.sortOptions = [
            { value: 'sentDate', type: 'Default (Time Created - Ascending)' },
            { value: 'lastName', type: 'Last Name' },
            { value: 'viewed', type: 'Unread' },
            { value: 'subject', type: 'Subject' },
        ];
    }

    ngOnInit() {
        this.sortBy(this.selectedContactFilter);
        // // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each contact's details
        this.contactFormService.getContact(this.id).subscribe((contactInfo) => {
            if (contactInfo !== null) {
                this.contact = contactInfo;
                console.log('this.contact', this.contact);
            }
        });
    }

    onDeleteContact(id) {
        this.contactFormService.deleteContact(id);
    }

    onMarkViewed(id) {
        this.contactFormService.setViewedContact(id);
    }

    onUnmarkViewed(id) {
        this.contactFormService.setUnviewedContact(id);
    }

    sortBy(selectedValue) {
        if (selectedValue !== 'viewed') {
            this.contacts$ = this.contactFormService.getAllContactForms(selectedValue);
        } else {
            this.contacts$ = this.contactFormService.getAllUnviewedContacts();
        }
    }
}
