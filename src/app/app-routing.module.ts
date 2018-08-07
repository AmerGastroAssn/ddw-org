import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './components/admin/admin.module';
import { HomeComponent } from './components/core/home/home.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterPageComponent },

];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminModule,
        RouterModule.forRoot(appRoutes,
          // {enableTracing: true}  // For route debugging.
        ),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {}
