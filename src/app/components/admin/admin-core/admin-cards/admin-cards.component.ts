import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'ddw-admin-cards',
    templateUrl: './admin-cards.component.html',
    styleUrls: ['./admin-cards.component.css']
})
export class AdminCardsComponent implements OnInit {
    @Input() card;
    photoURL: string;
    title: string;
    body: string;
    buttonString: string;
    url: string;
    orderNumber: number;
    uid: string;
    $key: string;


    constructor() {
    }

    ngOnInit() {

    }

}
