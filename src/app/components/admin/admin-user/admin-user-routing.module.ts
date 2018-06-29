import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const adminUserRouting: Routes = [
    // {
    //     path: 'users', component: AdminUserComponent,
    //     children: [
    //         { path: '', component: AdminUserListComponent }
    //     ]
    // }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(adminUserRouting,
          // {enableTracing: true}  // For route debugging.
        ),
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AdminUserRoutingModule {}
