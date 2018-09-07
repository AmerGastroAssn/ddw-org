import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';
// For jQuery
declare var $: any;

@Component({
    selector: 'ddw-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
    registerPages$: Page[];
    attendeePlanningPages$: Page[];
    educationPages$: Page[];
    exhibitorInfoPages$: Page[];
    newsAndMediaPages$: Page[];
    presentersPages$: Page[];
    isExtURL: boolean;


    constructor(private pageService: PageService) {
        $(document).ready(function () {
            if ($(this).scrollTop() <= 20) {
                $('#TopHeader[_ngcontent-c2]').css({ background: 'none' });
                $('#TopHeader[_ngcontent-c2] .networking a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] .static a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] .dropdown a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] i .fa-search').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-white.png');
                $('#TopHeader[_ngcontent-c2] .fa-search').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] li.show').css({ color: 'gray' });


            } else {
                $('#TopHeader[_ngcontent-c2]').css({ background: 'rgba(255, 255, 255, 0.9)' });
                $('#TopHeader[_ngcontent-c2] .networking a').css({ color: '#2e6da4' });
                $('#TopHeader[_ngcontent-c2] .static a').css({ color: '#5F6A72' });
                $('#TopHeader[_ngcontent-c2] .dropdown a').css({ color: '#5F6A72' });
                $('#TopHeader[_ngcontent-c2] img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-color.png');
            }
        });

        $(document).scroll(function () {
            if ($(this).scrollTop() <= 20) {
                $('#TopHeader[_ngcontent-c2]').css({ background: 'none' });
                $('#TopHeader[_ngcontent-c2] .networking a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] .static a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] .dropdown a').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] i .fa-search').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-white.png');
                $('#TopHeader[_ngcontent-c2] .fa-search').css({ color: 'white' });
                $('#TopHeader[_ngcontent-c2] li.show').css({ color: 'gray' });


            } else {
                $('#TopHeader[_ngcontent-c2]').css({ background: 'rgba(255, 255, 255, 0.9)' });
                $('#TopHeader[_ngcontent-c2] .networking a').css({ color: '#2e6da4' });
                $('#TopHeader[_ngcontent-c2] .static a').css({ color: '#5F6A72' });
                $('#TopHeader[_ngcontent-c2] .dropdown a').css({ color: '#5F6A72' });
                $('#TopHeader[_ngcontent-c2] img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-color.png');
            }
        });
    }

    ngOnInit() {
        /*------------------------------------------------
         Pages use _.Lodash to set order. Pages are ordered
         by their 'sortOrder' value.
         ------------------------------------------------*/
        this.pageService.getRegisterPages()
            .subscribe((pageArr) => {
                this.registerPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });

        this.pageService.getAttendeePlanningPages()
            .subscribe((pageArr) => {
                this.attendeePlanningPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });

        this.pageService.getEducationPages()
            .subscribe((pageArr) => {
                this.educationPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });

        this.pageService.getExhibitorInfoPages()
            .subscribe((pageArr) => {
                this.exhibitorInfoPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });

        this.pageService.getNewsAndMediaPages()
            .subscribe((pageArr) => {
                this.newsAndMediaPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });

        this.pageService.getPresenterPages()
            .subscribe((pageArr) => {
                this.presentersPages$ = _.orderBy(pageArr, ['sortOrder'], ['asc']);
            });
    }


    ngOnDestroy() {
        // $('#TopHeader').css({ background: 'rgba(255, 255, 255, 0.9)' });
        // $('.networking a').css({ color: '#2e6da4' });
        // $('.static a').css({ color: '#5F6A72' });
        // $('.dropdown a').css({ color: '#5F6A72' });
        // $('img.ddw-logo').attr('src',
        // 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-color.png');
    }

}
