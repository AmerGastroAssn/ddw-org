import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    body: string;
    sentDate: number;
    uid: string;
    mainAccountEmailAddress: string;

    constructor(
      private fb: FormBuilder,
      private contactFormService: ContactFormService,
      private sbAlert: MatSnackBar,
      private httpClient: HttpClient,
    ) {
        this.sentDate = Date.now();
        this.mainAccountEmailAddress = 'cstodd@gastro.org';
    }

    ngOnInit() {
        // Form:
        this.newContactForm = this.fb.group({
            firstName: ['' || this.firstName, Validators.required],
            lastName: ['' || this.lastName, Validators.required],
            email: ['' || this.email, Validators.required],
            phoneNumber: ['' || this.phoneNumber],
            subject: ['' || this.subject, Validators.required],
            body: ['' || this.body, Validators.required],
            sentDate: ['' || this.sentDate],
        });

        this.firstName = this.newContactForm.value.firstName;
        this.lastName = this.newContactForm.value.lastName;
        this.email = this.newContactForm.value.email;
        this.phoneNumber = this.newContactForm.value.phoneNumber;
        this.subject = this.newContactForm.value.subject;
        this.body = this.newContactForm.value.body;
        this.sentDate = this.newContactForm.value.sentDate;
    }

    onNewContact(formData: FormGroup) {
        if (!this.newContactForm.valid) {
            this.sbAlert.open('Missing at least one input, Form was NOT sent.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        } else {
            this.contactFormService.setContactForm(formData)
                .then(() => {
                    this.sendEmail(formData);
                    console.log('sendEmail(formData)', formData);
                });
            this.newContactForm.reset();
            this.sbAlert.open('Form was sent Successfully!', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-success']
            });
        }
    }

    sendEmail(formData) {
        const endpoint = `https://us-central1-ddw-org.cloudfunctions.net/firestoreEmail`;

        const data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            subject: formData.subject,
            body: formData.body,
        };
        console.log('data in sendEmail', data);

        this.httpClient.post(endpoint, data).subscribe();
    }

}
