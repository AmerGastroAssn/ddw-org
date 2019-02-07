import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, ProgressbarModule } from 'ngx-bootstrap';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { TrustUrlPipe } from '../../../pipes/trust-url.pipe';
// tslint:disable-next-line:max-line-length
import { AdminImageUploaderItemComponent } from '../admin-core/admin-image-uploader/admin-image-uploader-item/admin-image-uploader-item.component';
// tslint:disable-next-line:max-line-length
import { AdminPageAttendeePlanningListComponent } from './admin-page-attendee-planning-list/admin-page-attendee-planning-list.component';
import { AdminPageDetailsComponent } from './admin-page-details/admin-page-details.component';
import { AdminPageEditComponent } from './admin-page-edit/admin-page-edit.component';
import { AdminPageEducationListComponent } from './admin-page-education-list/admin-page-education-list.component';
import { AdminPageHomeComponent } from './admin-page-home/admin-page-home.component';
import { AdminPageItemComponent } from './admin-page-item/admin-page-item.component';
import { AdminPageListComponent } from './admin-page-list/admin-page-list.component';
import { AdminPageNewComponent } from './admin-page-new/admin-page-new.component';
import { AdminPageNewsAndMediaListComponent } from './admin-page-news-and-media-list/admin-page-news-and-media-list.component';
import { AdminPagePresentersListComponent } from './admin-page-presenters-list/admin-page-presenters-list.component';
import { AdminPageRegisterListComponent } from './admin-page-register-list/admin-page-register-list.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        BsDatepickerModule,
        MatProgressBarModule,
        ProgressbarModule,
        MatSlideToggleModule,
        CKEditorModule,
        MatTooltipModule,
        MatSelectModule,
    ],
    declarations: [
        AdminPageNewComponent,
        AdminPageListComponent,
        AdminPageItemComponent,
        AdminPageHomeComponent,
        AdminPageEditComponent,
        AdminPageDetailsComponent,
        AdminPageRegisterListComponent,
        AdminPagePresentersListComponent,
        AdminPageNewsAndMediaListComponent,
        AdminPageAttendeePlanningListComponent,
        AdminPageEducationListComponent,
        SafeHtmlPipe,
        TrustUrlPipe,
        AdminImageUploaderItemComponent,
    ],
    exports: [
        SafeHtmlPipe,
        TrustUrlPipe,
        AdminImageUploaderItemComponent,
    ]
})
export class AdminPageModule {}
