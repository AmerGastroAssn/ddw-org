import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { Page } from '../../../models/Page';
import { PageService } from '../../../services/page.service';
// For jQuery
declare var $: any;

@Component({
    selector: 'ddw-pages-navbar',
    templateUrl: './pages-navbar.component.html',
    styleUrls: ['./pages-navbar.component.css']
})
export class PagesNavbarComponent implements OnInit {
    registerPages$: Page[];
    attendeePlanningPages$: Page[];
    educationPages$: Page[];
    exhibitorInfoPages$: Page[];
    newsAndMediaPages$: Page[];
    presentersPages$: Page[];
    isExtURL: boolean;
    googleSearch: string;

    constructor(private pageService: PageService) {
        // $(document).ready(function () {
        //     $(window).scroll(function () {
        //         const scrollPos   = $(window).scrollTop(),
        //               navLinks    = $('li.nav-item > a'),
        //               navDropdown = $('a.dropdown-item'),
        //               navbar      = $('.navbar');
        //
        //         if (scrollPos > 150) {
        //             navbar.addClass('navbarWhite');
        //             navLinks.addClass('linksDark');
        //             navDropdown.addClass('linksDark');
        //         } else {
        //             navbar.removeClass('navbarWhite');
        //             navLinks.removeClass('linksDark');
        //             navDropdown.removeClass('linksDark');
        //         }
        //     });
        // });
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

        this.googleSearch = `<script>
              (function() {
                var cx = '010781389649301804341:tuglqcuc3hc';
                var gcse = document.createElement('script');
                gcse.type = 'text/javascript';
                gcse.async = true;
                gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
                var s = document.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(gcse, s);
              })();
              window.onload = function(){
                document.getElementById('gsc-i-id1').placeholder = 'Search!';
              };
            </script>
            <gcse:search></gcse:search>`;
    }


}
