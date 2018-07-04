import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-core/admin-sidebar/admin-sidebar.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminRegisterPageNewComponent } from './admin-pages/admin-register-page-new/admin-register-page-new.component';
import { AdminRegisterPageComponent } from './admin-pages/admin-register-page/admin-register-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminPagesComponent,
        AdminRegisterPageNewComponent,
        AdminRegisterPageComponent,
        AdminSidebarComponent,
        AdminComponent,
        AdminNavbarComponent,
        AdminLoginComponent,
        AdminSignupComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
    ],
    exports: []
})
export class AdminModule {}
