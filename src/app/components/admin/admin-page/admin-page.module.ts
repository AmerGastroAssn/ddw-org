import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { AdminSidenavComponent } from '../admin-core/admin-sidenav/admin-sidenav.component';
import { AdminPageDetailsComponent } from './admin-page-details/admin-page-details.component';
import { AdminPageEditComponent } from './admin-page-edit/admin-page-edit.component';
import { AdminPageHomeComponent } from './admin-page-home/admin-page-home.component';
import { AdminPageItemComponent } from './admin-page-item/admin-page-item.component';
import { AdminPageListComponent } from './admin-page-list/admin-page-list.component';
import { AdminPageNewComponent } from './admin-page-new/admin-page-new.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        CKEditorModule,
        BsDatepickerModule,
        MatProgressBarModule,
    ],
    declarations: [
        AdminPageNewComponent,
        AdminPageListComponent,
        AdminPageItemComponent,
        AdminPageHomeComponent,
        AdminPageEditComponent,
        AdminPageDetailsComponent,
    ]
})
export class AdminPageModule {}
