import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
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
    widgetSnippet: string;


    constructor(
      private metaService: AdminMetaService,
      private fb: FormBuilder,
      private sbAlert: MatSnackBar,
    ) {

    }

    ngOnInit() {
        // Get Meta
        this.metaService.getMeta().subscribe((meta) => {
            if (meta) {
                this.meta = meta;
                // Form:
                this.metaForm = this.fb.group({
                    $key: [this.metaService.$key],
                    metaDesc: [this.meta.metaDesc],
                    metaAuthor: [this.meta.metaAuthor],
                    metaKeywords: [this.meta.metaKeywords],
                    metaImageURL: [this.meta.metaImageURL],
                    headerArea: [this.meta.headerArea],
                    seo: [this.meta.seo],
                    widgetSnippet: [this.meta.widgetSnippet],
                });

                this.$key = this.metaForm.value.$key;
                this.metaDesc = this.metaForm.value.metaDesc;
                this.metaAuthor = this.metaForm.value.metaAuthor;
                this.metaKeywords = this.metaForm.value.metaKeywords;
                this.metaImageURL = this.metaForm.value.metaImageURL;
                this.headerArea = this.metaForm.value.headerArea;
                this.seo = this.metaForm.value.seo;
                this.widgetSnippet = this.metaForm.value.widgetSnippet;
            }
        });
    }


    onMetaSubmit(metaData) {
        if (this.metaForm.valid) {
            this.metaService.updateMeta(metaData);
            this.metaForm.reset();
        } else {
            this.sbAlert.open('Meta form NOT Valid', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
        }
    }
}
