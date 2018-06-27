import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'ddw-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    title = 'Digestive Disease Week';

    constructor() {
    }

    ngOnInit() {
    }

}
