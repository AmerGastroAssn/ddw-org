import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminRegisterPageNewComponent } from './admin-pages/admin-register-page-new/admin-register-page-new.component';
import { AdminUserDetailsComponent } from './admin-user/admin-user-details/admin-user-details.component';
import { AdminUserEditComponent } from './admin-user/admin-user-edit/admin-user-edit.component';
import { AdminUserHomeComponent } from './admin-user/admin-user-home/admin-user-home.component';
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
                path: 'pages', component: AdminPagesComponent,
                children: [
                    { path: '', component: RegisterPageComponent },
                    { path: 'new', component: AdminRegisterPageNewComponent }
                ]
            },
            {
                path: 'users', component: AdminUserComponent,
                children: [
                    { path: '', component: AdminUserListComponent },
                    { path: 'new', component: AdminUserNewComponent },
                    { path: ':id', component: AdminUserDetailsComponent },
                    { path: ':id/edit', component: AdminUserEditComponent },
                ]
            }
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
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AdminRoutingModule {}
