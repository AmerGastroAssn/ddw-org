import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorComponent } from '../core/ckeditor/ckeditor.component';
import { AdminLoginComponent } from './admin-core/admin-login/admin-login.component';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminSettingsComponent } from './admin-core/admin-settings/admin-settings.component';
import { AdminSidebarComponent } from './admin-core/admin-sidebar/admin-sidebar.component';
import { AdminSignupComponent } from './admin-core/admin-signup/admin-signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

@NgModule({
    declarations: [
        AdminPageComponent,
        AdminSidebarComponent,
        AdminComponent,
        AdminNavbarComponent,
        AdminLoginComponent,
        AdminSignupComponent,
        AdminSettingsComponent,
        CKEditorComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule,
        CKEditorModule,
        NgxEditorModule
    ],
    exports: []
})
export class AdminModule {}
