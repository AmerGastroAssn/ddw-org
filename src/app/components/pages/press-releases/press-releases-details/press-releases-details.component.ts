import { Component, OnInit } from '@angular/core';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PressRelease } from '../../../../models/PressRelease';
import { AdminAdsService } from '../../../../services/admin-ads.service';
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
    pressReleaseTitle: string;
    newsTitle: string;
    headerbar: any;
    footerbar: any;


    constructor(
      private adminPressReleaseService: AdminPressReleaseService,
      private router: Router,
      private route: ActivatedRoute,
      private sanitizer: DomSanitizer,
      private meta: Meta,
      private metaService: AdminMetaService,
      private titleService: Title,
      private adsService: AdminAdsService,
    ) {
        this.banner = 'https://higherlogicdownload.s3.amazonaws.com/GASTRO/44b1f1fd-aaed-44c8-954f-b0eaea6b0462/UploadedImages/interior-bg.jpg';
        this.pressReleaseTitle = 'Press Releases';
        this.newsTitle = 'News & Media';
    }

    ngOnInit() {
        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
                this.headerbar = ads.headerbar;
            });

        // Get url/id
        this.url = this.route.snapshot.params['id'];
        // Get each user's details
        this.adminPressReleaseService.getPressRelease(this.url).subscribe((pressRelease) => {
            if (pressRelease !== null) {
                this.pressRelease = pressRelease;
                // Needed to sanitize the innerHTML
                this.body = this.sanitizer.bypassSecurityTrustHtml(pressRelease.body);
                // For pressRelease title
                this.titleService.setTitle(`${this.pressRelease.title} - DDW Website`);
                // Meta tags
                this.metaService.getMeta()
                    .subscribe((meta) => {
                        if (this.pressRelease && meta) {
                            this.meta.updateTag({
                                name: 'description',
                                content: this.pressRelease.metaDesc || meta.metaDesc
                            });
                            this.meta.updateTag({ name: 'author', content: meta.metaAuthor });
                            this.meta.updateTag({ name: 'keywords', content: meta.metaKeywords });
                            this.meta.updateTag({
                                property: 'og:url',
                                content: `https://ddw.org/${this.pressRelease.url}`
                            });
                            this.meta.updateTag({
                                property: 'og:title',
                                content: `${this.pressRelease.title} - Digestive Disease Week®`
                            });
                            this.meta.updateTag({ property: 'og:site_name', content: `Digestive Disease Week®` });
                            this.meta.updateTag({ property: 'og:see_also', content: `https://ddw.org/home` });
                            this.meta.updateTag({
                                property: 'og:description',
                                content: this.pressRelease.metaDesc || meta.metaDesc
                            });
                            this.meta.updateTag({
                                property: 'og:image',
                                content: meta.metaImageURL
                            });
                            this.meta.updateTag({
                                itemprop: 'name',
                                content: `https://ddw.org/${this.pressRelease.url}`
                            });
                            this.meta.updateTag({
                                itemprop: 'description',
                                content: this.pressRelease.metaDesc || meta.metaDesc
                            });
                            this.meta.updateTag({ itemprop: 'image', content: meta.metaImageURL });
                            this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
                            this.meta.updateTag({ name: 'twitter:creator', content: '@DDWMeeting' });
                            this.meta.updateTag({
                                name: 'twitter:url',
                                content: `https://ddw.org/${this.pressRelease.url}`
                            });
                            this.meta.updateTag({ name: 'twitter:title', content: this.pressRelease.title });
                            this.meta.updateTag({ name: 'twitter:site', content: '@DDWMeeting' });
                            this.meta.updateTag({
                                name: 'twitter:description',
                                content: this.pressRelease.metaDesc || meta.metaDesc
                            });
                            this.meta.updateTag({
                                name: 'twitter:image',
                                content: meta.metaImageURL
                            });
                        }
                    });
            }
        });

    }


}
