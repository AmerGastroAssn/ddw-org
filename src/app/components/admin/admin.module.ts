import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-core/admin-sidebar/admin-sidebar.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRegisterPageNewComponent } from './admin-page/admin-register-page-new/admin-register-page-new.component';
import { AdminRegisterPageComponent } from './admin-page/admin-register-page/admin-register-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';

@NgModule({
    declarations: [
        AdminPageComponent,
        AdminRegisterPageNewComponent,
        AdminRegisterPageComponent,
        AdminSidebarComponent,
        AdminComponent,
        AdminNavbarComponent,
        AdminLoginComponent,
        AdminSignupComponent,
        AdminSettingsComponent,
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
