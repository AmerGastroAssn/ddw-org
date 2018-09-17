import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ContactForm } from '../../../models/ContactForm';
import { ContactFormService } from '../../../services/contact-form.service';

@Component({
    selector: 'ddw-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
    newContactForm: FormGroup;
    contactForm: ContactForm;
    $key: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    subject: string;
    message: string;
    programType: string;
    sentDate: number;
    uid: string;

    constructor(
      private fb: FormBuilder,
      private contactFormService: ContactFormService,
      private sbAlert: MatSnackBar,
    ) {
        this.sentDate = Date.now();
    }

    ngOnInit() {
        // Form:
        this.newContactForm = this.fb.group({
            firstName: ['' || this.firstName],
            lastName: ['' || this.lastName],
            email: ['' || this.email],
            phoneNumber: ['' || this.phoneNumber],
            subject: ['' || this.subject],
            message: ['' || this.message],
            sentDate: ['' || this.sentDate],
            programType: ['' || this.programType],
        });

        this.firstName = this.newContactForm.value.firstName;
        this.lastName = this.newContactForm.value.lastName;
        this.email = this.newContactForm.value.email;
        this.phoneNumber = this.newContactForm.value.phoneNumber;
        this.subject = this.newContactForm.value.subject;
        this.message = this.newContactForm.value.message;
        this.sentDate = this.newContactForm.value.sentDate;
        this.programType = this.newContactForm.value.programType;
    }

    onNewContact(formData: FormGroup) {
        if (!this.newContactForm.valid) {
            this.sbAlert.open('Missing at least one input, Form was NOT sent.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.contactFormService.setContactForm(formData);
            console.log(formData);
            this.newContactForm.reset();
            this.sbAlert.open('Form was sent Successfully!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

}
