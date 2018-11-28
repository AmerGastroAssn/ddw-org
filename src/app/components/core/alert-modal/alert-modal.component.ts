import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Modal } from '../../../models/Modal';
import { AdminModalService } from '../../../services/admin-modal.service';

@Component({
    selector: 'ddw-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
    title: string;
    body: string;
    btnText: string;
    closeBtnName: string;
    modal: Modal;

    constructor(
      public bsModalRef: BsModalRef,
      private adminModalService: AdminModalService,
    ) {
    }

    ngOnInit() {
        this.adminModalService.getModal()
            .subscribe((modal) => {
                this.title = modal.title;
                this.body = modal.body;
                this.btnText = modal.btnText;
            });
    }
}
