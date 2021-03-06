import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Meta, Title } from '@angular/platform-browser';
import { ContactForm } from '../../../models/ContactForm';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
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
    bannerImage: string;
    headerbar: any;
    footerbar: any;


    constructor(
      private fb: FormBuilder,
      private contactFormService: ContactFormService,
      private sbAlert: MatSnackBar,
      private httpClient: HttpClient,
      private adsService: AdminAdsService,
      private titleService: Title,
      private meta: Meta,
      private metaService: AdminMetaService,
    ) {
        this.sentDate = Date.now();
        this.bannerImage = 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg';
    }

    // For Form Validations
    get f() {
        return this.newContactForm.controls;
    }

    ngOnInit() {
        this.titleService.setTitle(`Contact Us - DDW Website`);
        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
                this.headerbar = ads.headerbar;
            });


        this.metaService.getMeta()
            .subscribe((meta) => {
                if (meta) {
                    this.meta.updateTag({ name: 'description', content: meta.metaDesc });
                    this.meta.updateTag({ name: 'author', content: meta.metaAuthor });
                    this.meta.updateTag({ name: 'keywords', content: meta.metaKeywords });
                    this.meta.updateTag({ property: 'og:url', content: `http://ddw.org/contactus` });
                    this.meta.updateTag({
                        property: 'og:title',
                        content: `Contact Us - Digestive Digest Week®`
                    });
                    this.meta.updateTag({ property: 'og:site_name', content: `Digestive Digest Week®` });
                    this.meta.updateTag({ property: 'og:see_also', content: `http://ddw.org/contactus` });
                    this.meta.updateTag({
                        property: 'og:description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({
                        property: 'og:image',
                        content: meta.metaImageURL
                    });
                    this.meta.updateTag({ itemprop: 'name', content: `http://ddw.org/contactus` });
                    this.meta.updateTag({
                        itemprop: 'description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({ itemprop: 'image', content: meta.metaImageURL });
                    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
                    this.meta.updateTag({ name: 'twitter:creator', content: '@DDWMeeting' });
                    this.meta.updateTag({ name: 'twitter:url', content: `http://ddw.org/contactus` });
                    this.meta.updateTag({ name: 'twitter:title', content: 'Contact Us' });
                    this.meta.updateTag({ name: 'twitter:site', content: '@DDWMeeting' });
                    this.meta.updateTag({
                        name: 'twitter:description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({
                        name: 'twitter:image',
                        content: meta.metaImageURL
                    });
                }
            });


        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
                this.headerbar = ads.headerbar;
            });


        // Form:
        this.newContactForm = this.fb.group({
            firstName: [this.firstName, Validators.required],
            lastName: [this.lastName, Validators.required],
            email: [this.email, Validators.required],
            phoneNumber: ['' || this.phoneNumber],
            subject: [this.subject, Validators.required],
            body: [this.body, Validators.required],
            sentDate: [this.sentDate],
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
            this.sbAlert.open('Required form values are missing or phone number is not in correct format, Form NOT sent.', 'Dismiss', {
                duration: 4000,
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
