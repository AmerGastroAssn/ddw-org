import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminRoutingModule } from './components/admin/admin-routing.module';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const appRoutes: Routes = [
    { path: '', component: PagesComponent },
    { path: 'register', component: RegisterPageComponent },

];

@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        RouterModule.forRoot(appRoutes,
          // {enableTracing: true}  // For route debugging.
        ),
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule {}
