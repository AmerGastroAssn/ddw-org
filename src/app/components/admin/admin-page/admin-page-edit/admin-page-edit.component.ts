import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { Page } from '../../../../models/Page';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-admin-page-edit',
    templateUrl: './admin-page-edit.component.html',
    styleUrls: ['./admin-page-edit.component.css'],
    providers: [
        { provide: NG_VALUE_ACCESSOR, useExisting: AdminPageEditComponent, multi: true }
    ]
})
export class AdminPageEditComponent implements OnInit {
    @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
    page: Page;
    editPageForm: FormGroup;
    $key: string;
    title: string;
    author: string;
    date: string;
    photoURL: string;
    body: string;
    category: string;
    uid: string;
    published: boolean;
    template: string;
    disableAdminOnEdit: boolean;


    constructor(
      private pageService: PageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService
    ) {
    }

    // For Form Validations
    get f() {
        return this.editPageForm.controls;
    }

    ngOnInit() {
        this.disableAdminOnEdit = this.settingsService.getAdminSettings().disableAdmin;

        // Get id from url
        this.uid = this.route.snapshot.params['id'];
        // Get Page
        this.pageService.getPage(this.uid).subscribe((page) => {
            if (page !== null) {
                this.page = page;

                // Form:
                this.editPageForm = this.fb.group({
                    uid: [this.page.uid],
                    title: [this.page.title,
                            Validators.compose([
                                Validators.required, Validators.minLength(5)
                            ])
                    ],
                    body: [this.page.body,
                           Validators.compose([
                               Validators.required, Validators.minLength(100)
                           ])
                    ],
                    author: [this.page.author, Validators.required],
                    date: [this.page.date],
                    photoURL: [''],
                    category: [this.page.category || ''],
                    published: [this.page.published || false],
                    template: [this.page.template, Validators.required],
                });

                this.uid = this.editPageForm.value.uid;
                this.title = this.editPageForm.value.title;
                this.body = this.editPageForm.value.body;
                this.author = this.editPageForm.value.author;
                this.date = this.editPageForm.value.date;
                this.photoURL = this.editPageForm.value.photoURL;
                this.category = this.editPageForm.value.category;
                this.published = this.editPageForm.value.published;
                this.template = this.editPageForm.value.template;
            }
        });
    }

    onUpdatePage(formData) {
        if (!this.editPageForm.valid) {
            this.flashMessage.show('Something went wrong, Page was not updated.', {
                cssClass: 'alert-danger',
                timeout: 3500
            });
        } else {
            this.pageService.updatePage(formData, this.page.uid);
            this.editPageForm.reset();
            this.flashMessage.show(`${formData.title} was updated!`, {
                cssClass: 'alert-success',
                timeout: 3500
            });
        }
    }

    @HostListener('window:scroll')
    onScrollEvent() {
        this.datepicker.hide();
    }

    onFileSelection(event) {
        // this.pageService.fileSelection(event);
    }

}
