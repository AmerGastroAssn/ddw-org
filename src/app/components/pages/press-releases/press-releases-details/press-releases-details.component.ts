import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PressRelease } from '../../../../models/PressRelease';
import { AdminMetaService } from '../../../../services/admin-meta.service';
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
      private meta: Meta,
      private metaService: AdminMetaService,
    ) {
        this.banner = 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg';
        this.pageTitle = 'Press Releases';
        this.newsTitle = 'News & Media';
    }

    ngOnInit() {
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (this.pressRelease && meta) {
                    return this.meta.addTag({ name: 'description', content: meta.metaDesc }),
                      this.meta.addTag({ name: 'author', content: this.pressRelease.author }),
                      this.meta.addTag({ name: 'keywords', content: meta.metaKeywords }),
                      this.meta.addTag({ property: 'og:url', content: 'https://ddw.org' }),
                      this.meta.addTag({
                          property: 'og:title',
                          content: `${this.pageTitle} - Digestive Digest Week®`
                      }),
                      this.meta.addTag({ property: 'og:description', content: meta.metaDesc }),
                      this.meta.addTag({ property: 'og:image', content: meta.metaImageURL });
                }
            });

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
