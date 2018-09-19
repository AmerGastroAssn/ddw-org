import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactForm } from '../../../../../models/ContactForm';
import { AuthService } from '../../../../../services/auth.service';
import { ContactFormService } from '../../../../../services/contact-form.service';

@Component({
    selector: 'ddw-admin-contact-us-details',
    templateUrl: './admin-contact-us-details.component.html',
    styleUrls: ['./admin-contact-us-details.component.css']
})
export class AdminContactUsDetailsComponent implements OnInit {
    id: string;
    contact: ContactForm;

    constructor(
      private contactFormService: ContactFormService,
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {
    }

    ngOnInit() {
        // Get id from url
        this.id = this.route.snapshot.params['id'];
        // Get each contact's details
        this.contactFormService.getContact(this.id).subscribe((contactInfo) => {
            if (contactInfo !== null) {
                this.contact = contactInfo;
                console.log('this.contact', this.contact);
            }
        });
    }

    onDeleteContact() {
        this.contactFormService.deleteContact(this.contact.uid);
    }

    onMarkViewed(id) {
        this.contactFormService.setViewedContact(id);
    }

    onUnmarkViewed(id) {
        this.contactFormService.setUnviewedContact(id);
    }

}
