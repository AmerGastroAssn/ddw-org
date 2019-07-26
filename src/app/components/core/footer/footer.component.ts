import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';

@Component({
    selector: 'ddw-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    registerPages: Page[];
    attendeePlanningPages: Page[];
    educationPages: Page[];
    exhibitorInfoPages: Page[];
    newsAndMediaPages: Page[];
    presentersPages: Page[];
    logo: string;

    constructor(private pageService: PageService) {
        // tslint:disable-next-line:max-line-length
        this.logo = 'https://firebasestorage.googleapis.com/v0/b/ddw-org.appspot.com/o/images%2F2019%2F1562782847583_ddw2020_logo_yellow_rgb_r.png?alt=media&token=6d7ae798-2170-4ad6-acef-472b8be1fea3';
    }

    ngOnInit() {
        /*------------------------------------------------
         Pages use _.Lodash to set order. Pages are ordered
         by their 'sortOrder' value.
         ------------------------------------------------*/
        this.pageService.getRegisterPages()
          .subscribe((pageArr) => {
              this.registerPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });

        this.pageService.getAttendeePlanningPages()
          .subscribe((pageArr) => {
              this.attendeePlanningPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });

        this.pageService.getEducationPages()
          .subscribe((pageArr) => {
              this.educationPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });

        this.pageService.getExhibitorInfoPages()
          .subscribe((pageArr) => {
              this.exhibitorInfoPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });

        this.pageService.getNewsAndMediaPages()
          .subscribe((pageArr) => {
              this.newsAndMediaPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });

        this.pageService.getPresenterPages()
          .subscribe((pageArr) => {
              this.presentersPages = _.orderBy(pageArr, ['sortOrder'], ['asc']);
          });
    }

}
