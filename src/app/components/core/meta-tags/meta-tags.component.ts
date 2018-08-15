import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Meta } from '../../../models/Meta';

@Component({
    selector: 'ddw-meta-tags',
    templateUrl: './meta-tags.component.html',
    styleUrls: ['./meta-tags.component.css']
})
export class MetaTagsComponent implements OnInit {
    // @Input() meta: Meta;
    meta: Meta;
    metas$: Observable<Meta>;
    headerArea: string;
    seo: string;

    constructor(
      // private metaService: AdminMetaService,
    ) {
    }

    ngOnInit() {
        // this.metaService.getMeta()
        //     .subscribe((metaInfo) => {
        //         console.log('this.meta', metaInfo);
        //         return this.meta = metaInfo;
        //     });
    }

}
