import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../../guards/admin.guard';
import { AuthGuard } from '../../guards/auth.guard';
import { RegisterGuard } from '../../guards/register.guard';
import { AdminAdsComponent } from './admin-core/admin-ads/admin-ads.component';
import { AdminCardsEditComponent } from './admin-core/admin-cards/admin-cards-edit/admin-cards-edit.component';
import { AdminFeaturedBlogPostsEditComponent } from './admin-core/admin-featured-blog-posts/admin-featured-blog-posts-edit/admin-featured-blog-posts-edit.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminMetaComponent } from './admin-core/admin-meta/admin-meta.component';
import { AdminResetPasswordComponent } from './admin-core/admin-reset-password/admin-reset-password.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageAttendeePlanningListComponent } from './admin-page/admin-page-attendee-planning-list/admin-page-attendee-planning-list.component';
import { AdminPageDetailsComponent } from './admin-page/admin-page-details/admin-page-details.component';
import { AdminPageEditComponent } from './admin-page/admin-page-edit/admin-page-edit.component';
import { AdminPageEducationListComponent } from './admin-page/admin-page-education-list/admin-page-education-list.component';
import { AdminPageExhibitorInformationListComponent } from './admin-page/admin-page-exhibitor-information-list/admin-page-exhibitor-information-list.component';
import { AdminPageListComponent } from './admin-page/admin-page-list/admin-page-list.component';
import { AdminPageNewComponent } from './admin-page/admin-page-new/admin-page-new.component';
import { AdminPageNewsAndMediaListComponent } from './admin-page/admin-page-news-and-media-list/admin-page-news-and-media-list.component';
import { AdminPagePresentersListComponent } from './admin-page/admin-page-presenters-list/admin-page-presenters-list.component';
import { AdminPageRegisterListComponent } from './admin-page/admin-page-register-list/admin-page-register-list.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminPageModule } from './admin-page/admin-page.module';
import { AdminUserDetailsComponent } from './admin-user/admin-user-details/admin-user-details.component';
import { AdminUserEditComponent } from './admin-user/admin-user-edit/admin-user-edit.component';
import { AdminUserListComponent } from './admin-user/admin-user-list/admin-user-list.component';
import { AdminUserNewComponent } from './admin-user/admin-user-new/admin-user-new.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminUserModule } from './admin-user/admin-user.module';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        children: [
            {
                path: 'pages', component: AdminPageComponent,
                children: [
                    { path: '', component: AdminPageListComponent, canActivate: [AuthGuard] },
                    { path: 'new', component: AdminPageNewComponent, canActivate: [AuthGuard] },
                    { path: ':id', component: AdminPageDetailsComponent, canActivate: [AuthGuard] },
                    { path: ':id/edit', component: AdminPageEditComponent, canActivate: [AuthGuard] },
                ]
            },
            {
                path: 'users', component: AdminUserComponent,
                children: [
                    { path: '', component: AdminUserListComponent, canActivate: [AuthGuard] },
                    { path: 'new', component: AdminUserNewComponent, canActivate: [AuthGuard, AdminGuard] },
                    { path: ':id', component: AdminUserDetailsComponent, canActivate: [AuthGuard] },
                    { path: ':id/edit', component: AdminUserEditComponent, canActivate: [AuthGuard, AdminGuard] },
                ]
            },
            { path: 'register', component: AdminPageRegisterListComponent, canActivate: [AuthGuard] },
            { path: 'attendee-planning', component: AdminPageAttendeePlanningListComponent, canActivate: [AuthGuard] },
            { path: 'education', component: AdminPageEducationListComponent, canActivate: [AuthGuard] },
            { path: 'exhibitor-information', component: AdminPageExhibitorInformationListComponent, canActivate: [AuthGuard] },
            { path: 'news-and-media', component: AdminPageNewsAndMediaListComponent, canActivate: [AuthGuard] },
            { path: 'presenters', component: AdminPagePresentersListComponent, canActivate: [AuthGuard] },
            { path: 'login', component: AdminLoginComponent },
            { path: 'reset', component: AdminResetPasswordComponent },
            { path: 'signup', component: AdminSignupComponent, canActivate: [RegisterGuard] },
            { path: 'settings', component: AdminSettingsComponent, canActivate: [AdminGuard] },
            { path: 'cards', component: AdminCardsEditComponent, canActivate: [AdminGuard] },
            { path: 'featured-posts', component: AdminFeaturedBlogPostsEditComponent, canActivate: [AdminGuard] },
            { path: 'meta', component: AdminMetaComponent, canActivate: [AdminGuard] },
            { path: 'ads', component: AdminAdsComponent, canActivate: [AdminGuard] },
        ]
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminRoutes,
          // {enableTracing: true}  // For route debugging.
        ),
        AdminUserModule,
        AdminPageModule,
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AdminRoutingModule {}
