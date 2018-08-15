import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Meta } from '../../../../models/Meta';
import { AdminMetaService } from '../../../../services/admin-meta.service';

@Component({
    selector: 'ddw-admin-meta',
    templateUrl: './admin-meta.component.html',
    styleUrls: ['./admin-meta.component.css']
})
export class AdminMetaComponent implements OnInit {
    metaForm: FormGroup;
    meta: Meta;
    $key: string;
    metaDesc: string;
    metaAuthor: string;
    metaKeywords: string;
    metaImageURL: string;
    headerArea: string;
    seo: string;
    footerArea: string;


    constructor(
      private metaService: AdminMetaService,
      private fb: FormBuilder,
    ) {

    }

    ngOnInit() {
        // Get Meta
        this.metaService.getMeta().subscribe((meta) => {
            if (meta !== null) {
                this.meta = meta;
                // Form:
                this.metaForm = this.fb.group({
                    $key: [this.metaService.$key],
                    metaDesc: [this.metaDesc],
                    metaAuthor: [this.metaAuthor],
                    metaKeywords: [this.metaKeywords],
                    metaImageURL: [this.metaImageURL],
                    headerArea: [this.headerArea],
                    seo: [this.seo],
                    footerArea: [this.footerArea],
                });

                this.$key = this.metaForm.value.$key;
                this.metaDesc = this.metaForm.value.metaDesc;
                this.metaAuthor = this.metaForm.value.metaAuthor;
                this.metaKeywords = this.metaForm.value.metaKeywords;
                this.metaImageURL = this.metaForm.value.metaImageURL;
                this.headerArea = this.metaForm.value.headerArea;
                this.seo = this.metaForm.value.seo;
                this.footerArea = this.metaForm.value.footerArea;
            }
        });
    }


    onMetaSubmit(metaData) {
        this.metaService.updateMeta(metaData);
        this.metaForm.reset(this.metaService.getMeta());
    }
}
