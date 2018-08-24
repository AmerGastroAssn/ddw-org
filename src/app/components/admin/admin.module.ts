import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule
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
import { AdminAdsComponent } from './admin-core/admin-ads/admin-ads.component';
import { AdminCardsEditComponent } from './admin-core/admin-cards/admin-cards-edit/admin-cards-edit.component';
import { AdminFeaturedBlogPostsEditComponent } from './admin-core/admin-featured-blog-posts/admin-featured-blog-posts-edit/admin-featured-blog-posts-edit.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminMetaComponent } from './admin-core/admin-meta/admin-meta.component';
import { AdminMobileFooternavComponent } from './admin-core/admin-mobile-footernav/admin-mobile-footernav.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminResetPasswordComponent } from './admin-core/admin-reset-password/admin-reset-password.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSidenavComponent } from './admin-core/admin-sidenav/admin-sidenav.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageExhibitorInformationListComponent } from './admin-page/admin-page-exhibitor-information-list/admin-page-exhibitor-information-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageModule } from './admin-page/admin-page.module';
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
