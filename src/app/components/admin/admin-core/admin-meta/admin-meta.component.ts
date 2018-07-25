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
                    headerArea: [this.headerArea],
                    seo: [this.seo],
                    footerArea: [this.footerArea],
                });

                this.$key = this.metaForm.value.$key;
                this.headerArea = this.metaForm.value.headerArea;
                this.seo = this.metaForm.value.seo;
                this.footerArea = this.metaForm.value.footerArea;
            }
        });
    }


    onMetaSubmit(metaData) {
        this.metaService.updateMeta(metaData);
    }
}
