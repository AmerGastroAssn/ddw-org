import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { AdminUserItemComponent } from './admin-user-item/admin-user-item.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserNewComponent } from './admin-user-new/admin-user-new.component';
import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from './admin-user.component';
import { AdminUserHomeComponent } from './admin-user-home/admin-user-home.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminUserRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AdminUserComponent,
        AdminUserListComponent,
        AdminUserItemComponent,
        AdminUserNewComponent,
        AdminUserDetailsComponent,
        AdminUserEditComponent,
        AdminUserHomeComponent,
    ]
})
export class AdminUserModule {}
