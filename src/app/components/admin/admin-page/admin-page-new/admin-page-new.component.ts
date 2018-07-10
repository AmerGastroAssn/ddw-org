import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FlashMessagesService } from 'angular2-flash-messages';
import { CKEditorComponent } from 'ng2-ckeditor';
import { AdminSettingsService } from '../../../../services/admin-settings.service';
import { AuthService } from '../../../../services/auth.service';
import { PageService } from '../../../../services/page.service';

@Component({
    selector: 'ddw-admin-page-new',
    templateUrl: './admin-page-new.component.html',
    styleUrls: ['./admin-page-new.component.css'],
})
export class AdminPageNewComponent implements OnInit {
    newPageForm: NgForm;
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
    disableAdminOnNew: boolean;
    // CKEditor
    ckEditorPath = CKEditorComponent;


    page: any = {
        $key: '',
        title: '',
        author: '',
        date: '',
        photoURL: '',
        body: '',
        category: '',
        uid: '',
        published: '',
        template: ''
    };

    CKEDitorContent = this.page.body;

    constructor(
      private pageService: PageService,
      private router: Router,
      private route: ActivatedRoute,
      private flashMessage: FlashMessagesService,
      private fb: FormBuilder,
      private settingsService: AdminSettingsService,
      private authService: AuthService
    ) {

        this.authService.getAuth().subscribe((auth) => {
            if (auth) {
                this.author = auth.email;
            } else {

            }
        });

    }

    // For Form Validations
    get f() {
        return this.newPageForm.controls;
    }

    ngOnInit() {


        // Settings
        this.disableAdminOnNew = this.settingsService.getAdminSettings().disableAdmin;

        // Form:
        // this.newPageForm = this.fb.group({
        //     uid: [''],
        //     title: ['',
        //             Validators.compose([
        //                 Validators.required, Validators.minLength(5)
        //             ])
        //     ],
        //     body: [this.body,
        //            Validators.compose([
        //                Validators.required, Validators.minLength(100)
        //            ])
        //     ],
        //     author: ['' || this.author, Validators.required],
        //     date: [Date.now()],
        //     photoURL: ['' || 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg'],
        //     category: [''],
        //     published: [''],
        //     template: ['' || 'Full Width', Validators.required]
        // });

        // this.uid = this.newPageForm.value.uid;
        // this.title = this.newPageForm.value.title;
        // // this.body = this.newPageForm.value.body;
        // this.author = this.newPageForm.value.author;
        // this.date = this.newPageForm.value.date;
        // this.photoURL = this.newPageForm.value.photoURL;
        // this.category = this.newPageForm.value.category;
        // this.published = this.newPageForm.value.published;
        // this.published = this.newPageForm.value.published;
        // this.template = this.newPageForm.value.template;

        // CKEditor
        // ClassicEditor
        // .create(document.querySelector('#body'), (data) => {
        //     this.body = this.ckEditorPath.getData(data);
        // }, {
        //     // toolbar: ['bold', 'italic', 'link']
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    }


    onAddNewPage(formData: NgForm) {

        console.log(formData);
        // if (!this.newPageForm.valid) {
        //     this.flashMessage.show('Something went wrong, Page was not created.', {
        //         cssClass: 'alert-danger',
        //         timeout: 3500
        //     });
        // } else {
        //     this.pageService.addPage(formData);
        //     this.newPageForm.reset();
        //     this.flashMessage.show(`${formData.title} was created!`, {
        //         cssClass: 'alert-success',
        //         timeout: 3500
        //     });
        // }
    }

}
