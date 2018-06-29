import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserRoutingModule } from './admin-user-routing.module';
import { AdminUserComponent } from './admin-user.component';
import { AdminUserItemComponent } from './admin-user-item/admin-user-item.component';
import { AdminUserNewComponent } from './admin-user-new/admin-user-new.component';
import { AdminUserDetailsComponent } from './admin-user-details/admin-user-details.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminUserRoutingModule,
    ],
    declarations: [
        AdminUserComponent,
        AdminUserListComponent,
        AdminUserItemComponent,
        AdminUserNewComponent,
        AdminUserDetailsComponent,
        AdminUserEditComponent,
    ]
})
export class AdminUserModule {}
