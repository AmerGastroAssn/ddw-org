import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminNavbarComponent } from './admin-core/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './admin-core/admin-sidebar/admin-sidebar.component';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { AdminRegisterPageComponent } from './admin-pages/admin-register-page/admin-register-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdminPagesComponent,
        AdminRegisterPageComponent,
        AdminSidebarComponent,
        AdminNavbarComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    exports: []
})
export class AdminModule {}
