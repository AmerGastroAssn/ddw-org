import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
    selector: 'ddw-alert-modal',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
    title: string;
    closeBtnName: string;
    content: string;

    constructor(public bsModalRef: BsModalRef) {
    }

    ngOnInit() {

    }
}
