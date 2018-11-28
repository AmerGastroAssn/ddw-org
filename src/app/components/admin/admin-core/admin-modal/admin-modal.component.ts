import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Modal } from '../../../../models/Modal';
import { User } from '../../../../models/User';
import { AdminModalService } from '../../../../services/admin-modal.service';
import { AuthService } from '../../../../services/auth.service';

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

    CkeditorConfig = {
        allowedContent: true,
        height: 200,
    };

    constructor(
      private modalService: AdminModalService,
      private fb: FormBuilder,
      private sbAlert: MatSnackBar,
      private authService: AuthService,
    ) {
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
