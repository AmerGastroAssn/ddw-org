import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PrivacyPolicy } from '../../../models/PrivacyPolicy';
import { AdminAdsService } from '../../../services/admin-ads.service';
import { AdminMetaService } from '../../../services/admin-meta.service';
import { AdminPrivacyPolicyService } from '../../../services/admin-privacy-policy.service';

@Component({
    selector: 'ddw-privacy-policy',
    templateUrl: './privacy-policy.component.html',
    styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements OnInit {
    bannerImage: string;
    $key: string;
    privacyPolicy: PrivacyPolicy;
    headerbar: any;
    footerbar: any;


    constructor(
      private privacyPolicyService: AdminPrivacyPolicyService,
      private adsService: AdminAdsService,
      private titleService: Title,
      private meta: Meta,
      private metaService: AdminMetaService,
    ) {
        this.bannerImage = 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg';
    }

    ngOnInit() {
        this.titleService.setTitle(`Privacy Policy - DDW Website`);
        // Ads
        this.adsService.getAds()
            .subscribe((ads) => {
                this.footerbar = ads.footerbar;
                this.headerbar = ads.headerbar;
            });

        this.privacyPolicyService.getPrivacyPolicy()
            .subscribe((policy) => {
                this.privacyPolicy = policy;
            });

        // Meta
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (meta) {
                    this.meta.updateTag({ name: 'description', content: meta.metaDesc });
                    this.meta.updateTag({ name: 'author', content: meta.metaAuthor });
                    this.meta.updateTag({ name: 'keywords', content: meta.metaKeywords });
                    this.meta.updateTag({ property: 'og:url', content: `http://ddw.org/privacy` });
                    this.meta.updateTag({
                        property: 'og:title',
                        content: `Privacy Policy - Digestive Digest Week®`
                    });
                    this.meta.updateTag({ property: 'og:site_name', content: `Digestive Digest Week®` });
                    this.meta.updateTag({ property: 'og:see_also', content: `http://ddw.org/privacy` });
                    this.meta.updateTag({
                        property: 'og:description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({
                        property: 'og:image',
                        content: meta.metaImageURL
                    });
                    this.meta.updateTag({ itemprop: 'name', content: `http://ddw.org/privacy` });
                    this.meta.updateTag({
                        itemprop: 'description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({ itemprop: 'image', content: meta.metaImageURL });
                    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
                    this.meta.updateTag({ name: 'twitter:creator', content: '@DDWMeeting' });
                    this.meta.updateTag({ name: 'twitter:url', content: `http://ddw.org/privacy` });
                    this.meta.updateTag({ name: 'twitter:title', content: 'Privacy Policy' });
                    this.meta.updateTag({ name: 'twitter:site', content: '@DDWMeeting' });
                    this.meta.updateTag({
                        name: 'twitter:description',
                        content: meta.metaDesc
                    });
                    this.meta.updateTag({
                        name: 'twitter:image',
                        content: meta.metaImageURL
                    });
                }
            });
    }

}
