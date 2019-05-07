import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { CustomLink } from '../../../models/CustomLink';
import { Page } from '../../../models/Page';
import { AdminCustomNavLinkService } from '../../../services/admin-custom-nav-link.service';
import { PageService } from '../../../services/page.service';
import { Router } from '@angular/router';
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
    googleSearch: string;
    customLinks: CustomLink;


    constructor(
      private pageService: PageService,
      private sanitizer: DomSanitizer,
      private customLinkService: AdminCustomNavLinkService,
    ) {

        $(document).ready(function () {
            if ($(this).scrollTop() <= 20) {
                $('#HomeNavBar').css({ background: 'none' });
                $('#HomeNavBar .networking a').css({ color: '#FFFFFF' });
                $('#HomeNavBar .static a').css({ color: 'white' });
                $('#HomeNavBar .dropdown a').css({ color: '#5F6A72' });
                $('#HomeNavBar .nav-item > a').css({ color: 'white' });
                $('a.level1.MPAuxNav.static').addClass('light-link');
                $('#HomeNavBar i .fa-search').css({ color: 'white' });
                $('#gsc-iw-id1').css({ border: '1px solid #FFFFFF' });
                $('#HomeNavBar img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-white.png');
                $('#HomeNavBar .fa-search').css({ color: 'white' });
                $('#HomeNavBar .show > a').css({ color: 'gray' });
                $('#HomeNavBar .fab').css({ color: 'white !important' });

            } else {
                $('#HomeNavBar').css({ background: 'rgba(255, 255, 255, 0.9)' });
                $('#HomeNavBar .networking > a').css({ color: '#2e6da4' });
                $('#HomeNavBar .static a').css({ color: '#5F6A72' });
                $('a.level1.MPAuxNav.static').removeClass('light-link');
                $('#HomeNavBar .nav-item > a').css({ color: '#5F6A72' });
                $('#HomeNavBar .dropdown a').css({ color: '#5F6A72' });
                $('#gsc-iw-id1').css({ border: '1px solid #5f6a72' });
                $('#HomeNavBar i .fa-search').css({ color: '#5F6A72' });
                $('.gsc-control-cse').css({ border: '1px solid #333333 !important' });
                $('#HomeNavBar img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-color.png');
            }
        });


        $(document).scroll(function () {
            if ($(this).scrollTop() <= 20) {
                $('#HomeNavBar').css({ background: 'none' });
                $('#HomeNavBar .networking a').css({ color: 'white' });
                $('#HomeNavBar .static a').css({ color: 'white' });
                $('#HomeNavBar .dropdown a').css({ color: '#5F6A72' });
                $('#HomeNavBar .nav-item > a').css({ color: 'white' });
                $('a.level1.MPAuxNav.static').addClass('light-link');
                $('#HomeNavBar i .fa-search').css({ color: 'white' });
                $('#gsc-iw-id1').css({ border: '1px solid #FFFFFF' });
                $('#HomeNavBar img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-white.png');
                $('#HomeNavBar .fa-search').css({ color: 'white' });
                $('#HomeNavBar .show > a').css({ color: 'gray' });
                $('#HomeNavBar .fab').css({ color: 'white' });


            } else {
                $('#HomeNavBar').css({ background: 'rgba(255, 255, 255, 0.9)' });
                $('#HomeNavBar .networking > a').css({ color: '#2e6da4' });
                $('#HomeNavBar .static a').css({ color: '#5F6A72' });
                $('#HomeNavBar .nav-item > a').css({ color: '#5F6A72' });
                $('a.level1.MPAuxNav.static').removeClass('light-link');
                $('#HomeNavBar .dropdown a').css({ color: '#5F6A72' });
                $('#gsc-iw-id1').css({ border: '1px solid #5f6a72' });
                $('#HomeNavBar i .fa-search').css({ color: '#5F6A72' });
                $('#HomeNavBar img.ddw-logo').attr('src', 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/ddw-color.png');
                $('#HomeNavBar .fab').css({ color: '#2e6da4' });
                $('#HomeNavBar .gsc-input-box').css({ border: '1px solid #333333 !important' });
            }
        });


    }

    ngOnInit() {
        // Navbar Custom Links:
        this.customLinkService.getCustomLinks()
          .subscribe((links) => {
              this.customLinks = links;
          });


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

        this.googleSearch = `<script>
          (function() {
            var cx = '015284641207443309559:h9oekyknvia';
            var gcse = document.createElement('script');
            gcse.type = 'text/javascript';
            gcse.async = true;
            gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(gcse, s);
          })();
        </script>
<gcse:search></gcse:search>`;


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
