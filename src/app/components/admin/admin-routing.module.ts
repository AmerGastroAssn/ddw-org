import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { RegisterPageNewComponent } from './admin-pages/register-page-new/register-page-new.component';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
    {
        path: 'admin', component: AdminComponent,
        children: [
            {
                path: 'pages', component: AdminPagesComponent,
                children: [
                    { path: '', component: RegisterPageComponent },
                    { path: 'new', component: RegisterPageNewComponent }
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
    ],
    exports: [
        RouterModule
    ],
    declarations: [AdminComponent]
})
export class AdminRoutingModule {}
