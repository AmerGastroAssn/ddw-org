import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSidenavComponent } from './admin-core/admin-sidenav/admin-sidenav.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
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
