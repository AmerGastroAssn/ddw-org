import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AdminMetaService } from './services/admin-meta.service';
import { AdminSettingsService } from './services/admin-settings.service';

@Component({
    selector: 'ddw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
      private meta: Meta,
      private metaService: AdminMetaService,
      private settingsService: AdminSettingsService,
    ) {
        this.settingsService.getSettings()
            .subscribe((settings) => {
                this.settingsService.saveLocalSettings(settings);
            });
    }

    ngOnInit() {
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                return this.meta.addTag({ name: 'description', content: meta.metaDesc }),
                  this.meta.addTag({ name: 'author', content: meta.metaAuthor }),
                  this.meta.addTag({ name: 'keywords', content: meta.metaKeywords }),
                  this.meta.addTag({ property: 'og:url', content: 'https://ddw.org' }),
                  this.meta.addTag({ property: 'og:title', content: 'Digestive Digest Week®' }),
                  this.meta.addTag({ property: 'og:description', content: meta.metaDesc }),
                  this.meta.addTag({ property: 'og:image', content: meta.metaImageURL });

            });
    }
}
