import { Component, Input, OnInit } from '@angular/core';
import { PressRelease } from '../../../../models/PressRelease';

@Component({
    selector: 'ddw-admin-press-release-item',
    templateUrl: './admin-press-release-item.component.html',
    styleUrls: ['./admin-press-release-item.component.css']
})
export class AdminPressReleaseItemComponent implements OnInit {
    @Input() pressRelease: PressRelease;

    constructor() {
    }

    ngOnInit() {
    }

}
