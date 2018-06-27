import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminPagesComponent } from './admin-pages/admin-pages.component';
import { RegisterPageComponent } from './admin-pages/register-page/register-page.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
    declarations: [
        AdminPagesComponent,
        RegisterPageComponent,
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        FormsModule
    ],
    exports: []
})
export class AdminModule {}
