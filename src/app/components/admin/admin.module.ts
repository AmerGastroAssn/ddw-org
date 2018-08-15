import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatMenuModule, MatSidenavModule, MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule, PopoverModule, ProgressbarModule } from 'ngx-bootstrap';
import { AdminAdsComponent } from './admin-core/admin-ads/admin-ads.component';
import { AdminCardsEditComponent } from './admin-core/admin-cards/admin-cards-edit/admin-cards-edit.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminMetaComponent } from './admin-core/admin-meta/admin-meta.component';
import { AdminMobileFooternavComponent } from './admin-core/admin-mobile-footernav/admin-mobile-footernav.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminResetPasswordComponent } from './admin-core/admin-reset-password/admin-reset-password.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSidenavComponent } from './admin-core/admin-sidenav/admin-sidenav.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminFeaturedBlogPostsComponent } from './admin-core/admin-featured-blog-posts/admin-featured-blog-posts.component';
import { AdminFeaturedBlogPostsEditComponent } from './admin-core/admin-featured-blog-posts/admin-featured-blog-posts-edit/admin-featured-blog-posts-edit.component';

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
        AdminFeaturedBlogPostsComponent,
        AdminFeaturedBlogPostsEditComponent,
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
    ],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatSnackBarModule
    ]
})
export class AdminModule {}
