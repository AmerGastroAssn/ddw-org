import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { SafeHtmlPipe } from '../../../pipes/safe-html.pipe';
import { CallToActionDetailComponent } from './components/call-to-action/call-to-action-detail/call-to-action-detail.component';
import { CallToActionEditComponent } from './components/call-to-action/call-to-action-edit/call-to-action-edit.component';
import { CallToActionItemComponent } from './components/call-to-action/call-to-action-item/call-to-action-item.component';
import { CallToActionListComponent } from './components/call-to-action/call-to-action-list/call-to-action-list.component';
import { CallToActionNewComponent } from './components/call-to-action/call-to-action-new/call-to-action-new.component';
import { TextSectionDetailComponent } from './components/text-section/text-section-detail/text-section-detail.component';
import { TextSectionEditComponent } from './components/text-section/text-section-edit/text-section-edit.component';
import { TextSectionItemComponent } from './components/text-section/text-section-item/text-section-item.component';
import { TextSectionListComponent } from './components/text-section/text-section-list/text-section-list.component';
import { TextSectionNewComponent } from './components/text-section/text-section-new/text-section-new.component';
import { EditorModule } from '@tinymce/tinymce-angular';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        EditorModule,
        RouterModule,
        MatTooltipModule,
    ],
    declarations: [
        CallToActionNewComponent,
        CallToActionEditComponent,
        CallToActionListComponent,
        CallToActionItemComponent,
        CallToActionDetailComponent,
        TextSectionNewComponent,
        TextSectionEditComponent,
        TextSectionListComponent,
        TextSectionItemComponent,
        TextSectionDetailComponent,
    ],
    exports: [],
    entryComponents: [
        // SafeHtmlPipe
    ]
})
export class ContentSectionModule {}
