import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule, MatSlideToggleModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, ProgressbarModule } from 'ngx-bootstrap';
import { AdminPressReleaseDetailsComponent } from './admin-press-release-details/admin-press-release-details.component';
import { AdminPressReleaseEditComponent } from './admin-press-release-edit/admin-press-release-edit.component';
import { AdminPressReleaseListComponent } from './admin-press-release-list/admin-press-release-list.component';
import { AdminPressReleaseNewComponent } from './admin-press-release-new/admin-press-release-new.component';
import { AdminPressReleaseComponent } from './admin-press-release.component';

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
        AdminPressReleaseNewComponent,
        AdminPressReleaseComponent,
        AdminPressReleaseEditComponent,
        AdminPressReleaseDetailsComponent,
        AdminPressReleaseListComponent,

    ],
    exports: []
})
export class AdminPressReleaseModule {}
