import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
    { path: 'admin', component: AdminComponent },

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
