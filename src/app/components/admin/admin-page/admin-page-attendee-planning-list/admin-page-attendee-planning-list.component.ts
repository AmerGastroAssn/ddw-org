import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Page } from '../../../../models/Page';
import { AdminPageService } from '../../../../services/admin-page.service';

@Component({
  selector: 'ddw-admin-page-attendee-planning-list',
  templateUrl: './admin-page-attendee-planning-list.component.html',
  styleUrls: ['./admin-page-attendee-planning-list.component.css']
})
export class AdminPageAttendeePlanningListComponent implements OnInit {
    attPage$: Observable<Page[]>;

    constructor(
      private readonly adminPageService: AdminPageService,
    ) {
    }

    ngOnInit() {
        this.attPage$ = this.adminPageService.getAllAttendeePages();
    }
}
