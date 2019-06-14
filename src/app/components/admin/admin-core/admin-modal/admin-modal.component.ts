import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Modal } from '../../../../models/Modal';
import { User } from '../../../../models/User';
import { AdminModalService } from '../../../../services/admin-modal.service';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environments/environment';

@Component({
    selector: 'ddw-admin-modal',
    templateUrl: './admin-modal.component.html',
    styleUrls: ['./admin-modal.component.css']
})
export class AdminModalComponent implements OnInit {
    modalForm: FormGroup;
    modal: Modal;
    $key: string;
    body: string;
    btnText: string;
    title: string;
    updatedAt: number = Date.now();
    uid: string;
    author: string;
    show: boolean;
    currentUser: User;
    // Tiny MCE Editor
    mceApiKey: string;
    mceConfig: object;

    constructor(
      private modalService: AdminModalService,
      private fb: FormBuilder,
      private sbAlert: MatSnackBar,
      private authService: AuthService,
    ) {
        this.mceApiKey = environment.mceApiKey;
        this.mceConfig = {
            height: 700,
            plugins: 'code, codesample, lists, tinymcespellchecker, link, preview, fullscreen, advcode',
            codesample_languages: [
                { text: 'HTML/XML', value: 'markup' },
                { text: 'JavaScript', value: 'javascript' },
                { text: 'CSS', value: 'css' },
                { text: 'SASS', value: 'sass' },
                { text: 'SCSS', value: 'scss' },
                { text: 'TypeScript', value: 'typescript' },
            ],
            // tslint:disable-next-line:max-line-length
            toolbar: 'undo redo fontsizeselect styleselect bold italic link unlink openLink forecolor backcolor alignleft aligncenter alignright alignjustify bullist numlist outdent indent fullscreen code preview',
            body_id: 'tiny-mce-textarea',
            // tslint:disable-next-line:max-line-length
            content_style: `body{font-family:'Open Sans',Roboto,'Helvetica Neue',sans-serif!important;line-height:2rem!important;font-size:1.1rem!important}a,a:link{color:#2e6da4}a.btn.btn-warning.btn-lg{background-color:#f47700;color:#fff;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:700;text-decoration:none;padding:.5em 2em;font-size:18px}a.btn.btn-warning.btn-lg:hover{background-color:#feb512;color:#004060;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;font-weight:400;text-decoration:none;padding:.5em 2em;font-size:18px}h1,h2,h3{font-family:Roboto,Helvetica,Arial,sans-serif;font-weight:600}
                `,
            content_css: `https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css`
        };
        this.updatedAt = Date.now();
        this.currentUser = this.authService.getProfile().email;
    }

    get f() {
        return this.modalForm.controls;
    }

    ngOnInit() {
        // Get Modal
        this.modalService.getModal().subscribe((modal) => {
            if (modal !== null) {
                this.modal = modal;
                // Form:
                this.modalForm = this.fb.group({
                    $key: [this.modalService.$key],
                    author: [this.currentUser || ''],
                    body: [this.modal.body],
                    btnText: [this.modal.btnText || 'Send'],
                    title: [this.modal.title],
                    show: [this.modal.show || false],
                    updatedAt: [this.updatedAt],
                    uid: [this.modalService.$key],
                });

                this.$key = this.modalForm.value.$key;
                this.author = this.modalForm.value.author;
                this.body = this.modalForm.value.body;
                this.btnText = this.modalForm.value.btnText;
                this.title = this.modalForm.value.title;
                this.show = this.modalForm.value.show;
                this.updatedAt = this.modalForm.value.updatedAt;
                this.uid = this.modalForm.value.uid;
            }
        });
    }


    onModalSubmit(modalData: object): void {
        if (this.modalForm.valid) {
            this.modalService.updateModal(modalData);
            this.modalService.getModal().subscribe((data) => {
                this.modalForm.reset(data);
            });
        } else {
            this.sbAlert.open('Alert Modal not Valid. Refresh your browser and try again.', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }
}
