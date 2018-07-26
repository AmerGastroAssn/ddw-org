import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ads } from '../../../../models/Ads';
import { AdminAdsService } from '../../../../services/admin-ads.service';

@Component({
    selector: 'ddw-admin-ads',
    templateUrl: './admin-ads.component.html',
    styleUrls: ['./admin-ads.component.css']
})
export class AdminAdsComponent implements OnInit {
    adsForm: FormGroup;
    ads: Ads;
    $key: string;
    headerbar: string;
    skyscraper: string;
    footerbar: string;


    constructor(
      private adsService: AdminAdsService,
      private fb: FormBuilder,
      private flashMessage: FlashMessagesService,
    ) {

    }

    ngOnInit() {
        // Get Ads
        this.adsService.getAds().subscribe((ads) => {
            if (ads !== null) {
                this.ads = ads;
                // Form:
                this.adsForm = this.fb.group({
                    $key: [this.adsService.$key],
                    headerbar: [this.headerbar],
                    skyscraper: [this.skyscraper],
                    footerbar: [this.footerbar],
                });

                this.$key = this.adsForm.value.$key;
                this.headerbar = this.adsForm.value.headerbar;
                this.skyscraper = this.adsForm.value.skyscraper;
                this.footerbar = this.adsForm.value.footerbar;
            }
        });
    }


    onAdsSubmit(adsData) {
        this.adsService.updateAds(adsData);
    }
}
