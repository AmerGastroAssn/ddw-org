import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminRegisterPageNewComponent } from './admin-pages/admin-register-page-new/admin-register-page-new.component';
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
                path: 'pages', component: AdminPagesComponent,
                children: [
                    { path: '', component: RegisterPageComponent, canActivate: [AuthGuard]  },
                    { path: 'new', component: AdminRegisterPageNewComponent, canActivate: [AuthGuard] }
                ]
            },
            {
                path: 'users', component: AdminUserComponent,
                children: [
                    { path: '', component: AdminUserListComponent, canActivate: [AuthGuard]  },
                    { path: 'new', component: AdminUserNewComponent, canActivate: [AuthGuard] },
                    { path: ':id', component: AdminUserDetailsComponent, canActivate: [AuthGuard]  },
                    { path: ':id/edit', component: AdminUserEditComponent, canActivate: [AuthGuard] },
                ]
            },
            { path: 'login', component: AdminLoginComponent },
            { path: 'signup', component: AdminSignupComponent },
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
