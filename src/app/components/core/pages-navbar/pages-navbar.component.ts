import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import * as _ from 'lodash';
import { CustomLink } from '../../../models/CustomLink';
import { Page } from '../../../models/Page';
import { AdminCustomNavLinkService } from '../../../services/admin-custom-nav-link.service';
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
    customLinks: CustomLink;

    constructor(@Inject(WINDOW) private window: Window, 
      private pageService: PageService,
      private customLinkService: AdminCustomNavLinkService,
    ) {
        $(document).ready(function () {
                $('#HomeNavBar .gsc-input-box').css({ 'border-color': '1px solid #333333 !important' });

        });


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


}
