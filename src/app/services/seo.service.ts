import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AdminMetaService } from './admin-meta.service';

@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
      private meta: Meta,
      private metaService: AdminMetaService,
      ) {

    }

    generateMeta(config) {
        // Meta tags
        this.metaService.getMeta()
            .subscribe((meta) => {
                if (meta) {
                    this.meta.addTags([
                        { name: 'description', content: meta.metaDesc },
                        { name: 'author', content: meta.metaAuthor },
                        { name: 'keywords', content: meta.metaKeywords },
                        { property: 'og:url', content: 'https://ddw.org' },
                        { property: 'og:title', content: `Digestive Digest Week®` },
                        { property: 'og:site_name', content: `Digestive Digest Week®` },
                        { property: 'og:see_also', content: `http://ddw.org/home` },
                        { property: 'og:description', content: meta.metaDesc },
                        { property: 'og:image', content: meta.metaImageURL },
                        { itemprop: 'name', content: 'http://ddw.org/home' },
                        { itemprop: 'description', content: meta.metaDesc },
                        { itemprop: 'image', content: meta.metaImageURL },
                        { name: 'twitter:card', content: meta.metaDesc },
                        { name: 'twitter:url', content: 'https://ddw.org/home' },
                        { name: 'twitter:site', content: '@DDWMeeting' },
                        { name: 'twitter:title', content: `Digestive Digest Week®` },
                        { name: 'twitter:description', content: meta.metaDesc },
                        { name: 'twitter:image', content: meta.metaImageURL },

                    ], true);
                }
            });

    }
}
