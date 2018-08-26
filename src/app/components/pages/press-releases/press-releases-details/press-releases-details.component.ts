import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PressRelease } from '../../../../models/PressRelease';
import { AdminPressReleaseService } from '../../../../services/admin-press-release.service';

@Component({
    selector: 'ddw-press-releases-details',
    templateUrl: './press-releases-details.component.html',
    styleUrls: ['./press-releases-details.component.css']
})
export class PressReleasesDetailsComponent implements OnInit {
    id: string;
    pressRelease: PressRelease;
    url: string;
    body: any;
    bannerPhotoURL: string;
    title: string;
    publishOn: number;
    banner: string;
    pageTitle: string;
    newsTitle: string;

    constructor(
      private adminPressReleaseService: AdminPressReleaseService,
      private router: Router,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer,
    ) {
        this.banner = 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg';
        this.pageTitle = 'Press Releases';
        this.newsTitle = 'News & Media';
    }

    ngOnInit() {
        // Get url/id
        this.url = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPressReleaseService.getPressRelease(this.url).subscribe((pressRelease) => {
            if (pressRelease !== null) {
                this.pressRelease = pressRelease;
                // Needed to sanitize the innerHTML
                this.body = this.sanitizer.bypassSecurityTrustHtml(pressRelease.body);
            }
        });

    }


}
