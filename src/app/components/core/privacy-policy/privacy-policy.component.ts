import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PrivacyPolicy } from '../../../models/PrivacyPolicy';
import { AdminAdsService } from '../../../services/admin-ads.service';
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
    ) {
        this.bannerImage = 'https://s3.amazonaws.com/DDW/ddw-org/images/banners/interior-bg.jpg';
    }

    ngOnInit() {
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
    }

}
