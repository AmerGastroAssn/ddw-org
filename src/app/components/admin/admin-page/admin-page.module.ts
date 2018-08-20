import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, ProgressbarModule } from 'ngx-bootstrap';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { TrustUrlPipe } from '../../../pipes/trust-url.pipe';
import { AdminPageDetailsComponent } from './admin-page-details/admin-page-details.component';
import { AdminPageEditComponent } from './admin-page-edit/admin-page-edit.component';
import { AdminPageHomeComponent } from './admin-page-home/admin-page-home.component';
import { AdminPageItemComponent } from './admin-page-item/admin-page-item.component';
import { AdminPageListComponent } from './admin-page-list/admin-page-list.component';
import { AdminPageNewComponent } from './admin-page-new/admin-page-new.component';
import { AdminPageRegisterListComponent } from './admin-page-register-list/admin-page-register-list.component';
import { AdminPagePresentersListComponent } from './admin-page-presenters-list/admin-page-presenters-list.component';
import { AdminPageNewsAndMediaListComponent } from './admin-page-news-and-media-list/admin-page-news-and-media-list.component';
import { AdminPageAttendeePlanningListComponent } from './admin-page-attendee-planning-list/admin-page-attendee-planning-list.component';
import { AdminPageEducationListComponent } from './admin-page-education-list/admin-page-education-list.component';

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
    ],
    declarations: [
        AdminPageNewComponent,
        AdminPageListComponent,
        AdminPageItemComponent,
        AdminPageHomeComponent,
        AdminPageEditComponent,
        AdminPageDetailsComponent,
        SafeHtmlPipe,
        TrustUrlPipe,
        AdminPageRegisterListComponent,
        AdminPagePresentersListComponent,
        AdminPageNewsAndMediaListComponent,
        AdminPageAttendeePlanningListComponent,
        AdminPageEducationListComponent
    ],
    exports: [
        SafeHtmlPipe,
        TrustUrlPipe
    ]
})
export class AdminPageModule {}
