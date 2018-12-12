// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from '../../../guards/auth.guard';
// import { CallToActionDetailComponent } from './components/call-to-action/call-to-action-detail/call-to-action-detail.component';
// import { CallToActionEditComponent } from './components/call-to-action/call-to-action-edit/call-to-action-edit.component';
// import { CallToActionListComponent } from './components/call-to-action/call-to-action-list/call-to-action-list.component';
// import { CallToActionNewComponent } from './components/call-to-action/call-to-action-new/call-to-action-new.component';
// import { CallToActionComponent } from './components/call-to-action/call-to-action.component';
// import { TextSectionDetailComponent } from './components/text-section/text-section-detail/text-section-detail.component';
// import { TextSectionEditComponent } from './components/text-section/text-section-edit/text-section-edit.component';
// import { TextSectionListComponent } from './components/text-section/text-section-list/text-section-list.component';
// import { TextSectionNewComponent } from './components/text-section/text-section-new/text-section-new.component';
// import { TextSectionComponent } from './components/text-section/text-section.component';
//
// const contentSectionRoutes: Routes = [
//     {
//         path: 'call-to-action', component: CallToActionComponent,
//         children: [
//             { path: '', component: CallToActionListComponent, canActivate: [AuthGuard] },
//             { path: 'new', component: CallToActionNewComponent, canActivate: [AuthGuard] },
//             { path: ':id', component: CallToActionDetailComponent, canActivate: [AuthGuard] },
//             { path: ':id/edit', component: CallToActionEditComponent, canActivate: [AuthGuard] },
//         ]
//     },
//     {
//         path: 'admin/text-section', component: TextSectionComponent,
//         children: [
//             { path: '', component: TextSectionListComponent, canActivate: [AuthGuard] },
//             { path: 'new', component: TextSectionNewComponent, canActivate: [AuthGuard] },
//             { path: ':id', component: TextSectionDetailComponent, canActivate: [AuthGuard] },
//             { path: ':id/edit', component: TextSectionEditComponent, canActivate: [AuthGuard] },
//         ]
//     }
//
// ];
//
//
// @NgModule({
//     imports: [
//         CommonModule,
//         RouterModule.forChild(contentSectionRoutes,
//           // {enableTracing: true}  // For route debugging.
//         ),
//     ],
//     exports: [
//         RouterModule,
//     ],
//     declarations: []
// })
// export class ContentSectionRoutingModule {}
