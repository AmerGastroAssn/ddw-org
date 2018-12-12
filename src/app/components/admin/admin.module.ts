import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatBottomSheetModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule, PopoverModule, ProgressbarModule, TabsModule, TimepickerModule } from 'ngx-bootstrap';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { TrustUrlPipe } from '../../pipes/trust-url.pipe';
import { AdminCalendarEditComponent } from './admin-calendar/admin-calendar-edit/admin-calendar-edit.component';
import { AdminCalendarListComponent } from './admin-calendar/admin-calendar-list/admin-calendar-list.component';
import { AdminCalendarNewComponent } from './admin-calendar/admin-calendar-new/admin-calendar-new.component';
import { AdminCalendarComponent } from './admin-calendar/admin-calendar.component';
import { CallToActionComponent } from './admin-content-section/components/call-to-action/call-to-action.component';
import { TextSectionComponent } from './admin-content-section/components/text-section/text-section.component';
import { ContentSectionModule } from './admin-content-section/content-section.module';
import { AdminAdsComponent } from './admin-core/admin-ads/admin-ads.component';
import { AdminBottomSheetNewComponent } from './admin-core/admin-bottom-sheet-new/admin-bottom-sheet-new.component';
import { AdminCardsEditComponent } from './admin-core/admin-cards/admin-cards-edit/admin-cards-edit.component';
import { AdminContactUsDetailsComponent } from './admin-core/admin-contact-us/admin-contact-us-details/admin-contact-us-details.component';
import { AdminContactUsListComponent } from './admin-core/admin-contact-us/admin-contact-us-list/admin-contact-us-list.component';
import { AdminContactUsComponent } from './admin-core/admin-contact-us/admin-contact-us.component';
import { AdminDashboardComponent } from './admin-core/admin-dashboard/admin-dashboard.component';
// tslint:disable-next-line:max-line-length
import { AdminFeaturedBlogPostsEditComponent } from './admin-core/admin-featured-blog-posts/admin-featured-blog-posts-edit/admin-featured-blog-posts-edit.component';
// tslint:disable-next-line:max-line-length
import { AdminFileUploaderItemComponent } from './admin-core/admin-file-uploader/admin-file-uploader-item/admin-file-uploader-item.component';
import { AdminFileUploaderComponent } from './admin-core/admin-file-uploader/admin-file-uploader.component';
import { AdminFilesComponent } from './admin-core/admin-files/admin-files.component';
// tslint:disable-next-line:max-line-length
import { AdminImageUploaderComponent } from './admin-core/admin-image-uploader/admin-image-uploader.component';
import { AdminImagesComponent } from './admin-core/admin-images/admin-images.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminMetaComponent } from './admin-core/admin-meta/admin-meta.component';
import { AdminMobileFooternavComponent } from './admin-core/admin-mobile-footernav/admin-mobile-footernav.component';
import { AdminModalComponent } from './admin-core/admin-modal/admin-modal.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminPrivacyPolicyComponent } from './admin-core/admin-privacy-policy/admin-privacy-policy.component';
import { AdminResetPasswordComponent } from './admin-core/admin-reset-password/admin-reset-password.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSidenavComponent } from './admin-core/admin-sidenav/admin-sidenav.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminCustomNavLinkEditComponent } from './admin-custom-nav-link/admin-custom-nav-link-edit/admin-custom-nav-link-edit.component';
import { AdminCustomNavLinkListComponent } from './admin-custom-nav-link/admin-custom-nav-link-list/admin-custom-nav-link-list.component';
import { AdminCustomNavLinkComponent } from './admin-custom-nav-link/admin-custom-nav-link.component';
import { AdminHomePageComponent } from './admin-home-page/admin-home-page.component';
import { AdminPageCardEditComponent } from './admin-page-card/admin-page-card-edit/admin-page-card-edit.component';
import { AdminPageCardItemComponent } from './admin-page-card/admin-page-card-item/admin-page-card-item.component';
import { AdminPageCardListComponent } from './admin-page-card/admin-page-card-list/admin-page-card-list.component';
import { AdminPageCardNewComponent } from './admin-page-card/admin-page-card-new/admin-page-card-new.component';
import { AdminPageCardComponent } from './admin-page-card/admin-page-card.component';
// tslint:disable-next-line:max-line-length
import { AdminPageExhibitorInformationListComponent } from './admin-page/admin-page-exhibitor-information-list/admin-page-exhibitor-information-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageModule } from './admin-page/admin-page.module';
import { AdminPressReleaseModule } from './admin-press-release/admin-press-release.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminPageComponent,
        AdminComponent,
        AdminNavbarComponent,
        AdminSidenavComponent,
        AdminLoginComponent,
        AdminSignupComponent,
        AdminSettingsComponent,
        AdminMobileFooternavComponent,
        AdminResetPasswordComponent,
        AdminMetaComponent,
        AdminAdsComponent,
        AdminCardsEditComponent,
        AdminFeaturedBlogPostsEditComponent,
        AdminPageExhibitorInformationListComponent,
        AdminCalendarEditComponent,
        AdminCalendarListComponent,
        AdminCalendarNewComponent,
        AdminCalendarComponent,
        AdminHomePageComponent,
        AdminBottomSheetNewComponent,
        AdminContactUsComponent,
        AdminContactUsDetailsComponent,
        AdminContactUsListComponent,
        AdminImageUploaderComponent,
        AdminCustomNavLinkComponent,
        AdminCustomNavLinkEditComponent,
        AdminCustomNavLinkListComponent,
        AdminPageCardComponent,
        AdminPageCardEditComponent,
        AdminPageCardListComponent,
        AdminPageCardItemComponent,
        AdminPageCardNewComponent,
        AdminDashboardComponent,
        AdminPrivacyPolicyComponent,
        AdminImagesComponent,
        AdminFileUploaderComponent,
        AdminFileUploaderItemComponent,
        AdminFilesComponent,
        AdminModalComponent,
        CallToActionComponent,
        TextSectionComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatMenuModule,
        ProgressbarModule,
        BsDatepickerModule,
        PopoverModule,
        AdminPageModule,
        TabsModule,
        TimepickerModule,
        CKEditorModule,
        MatExpansionModule,
        AdminPressReleaseModule,
        MatTooltipModule,
        MatBottomSheetModule,
        MatDividerModule,
        MatIconModule,
        MatSelectModule,
        MatFormFieldModule,
        MatCardModule,
    ],
    providers: [

    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule,
        SafeHtmlPipe,
        TrustUrlPipe,
        TabsModule,
    ]
})
export class AdminModule {}
