import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './components/admin/admin.module';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { HomeComponent } from './components/core/home/home.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { AttendeePlanningComponent } from './components/pages/attendee-planning/attendee-planning.component';
import { EducationComponent } from './components/pages/education/education.component';
import { ExhibitorInformationComponent } from './components/pages/exhibitor-information/exhibitor-information.component';
import { NewsAndMediaComponent } from './components/pages/news-and-media/news-and-media.component';
import { PagesComponent } from './components/pages/pages.component';
import { PresentersComponent } from './components/pages/presenters/presenters.component';
import { PressReleasesDetailsComponent } from './components/pages/press-releases/press-releases-details/press-releases-details.component';
import { PressReleasesComponent } from './components/pages/press-releases/press-releases.component';
import { RegisterComponent } from './components/pages/register/register.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'register', component: PagesComponent,
        children: [
            { path: ':id', component: RegisterComponent },
            { path: ':id/:id', component: RegisterComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'attendee-planning', component: PagesComponent,
        children: [
            { path: ':id', component: AttendeePlanningComponent },
            { path: ':id/:id', component: AttendeePlanningComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'education', component: PagesComponent,
        children: [
            { path: ':id', component: EducationComponent },
            { path: ':id/:id', component: EducationComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'exhibitor-information', component: PagesComponent,
        children: [
            { path: ':id', component: ExhibitorInformationComponent },
            { path: ':id/:id', component: ExhibitorInformationComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'news', component: PagesComponent,
        children: [
            { path: ':id', component: NewsAndMediaComponent },
            {
                path: '', component: PressReleasesComponent,
                children: [
                    { path: 'press-releases', component: PressReleasesComponent },
                    { path: 'press-releases/:id', component: PressReleasesDetailsComponent },
                    { path: '**', redirectTo: '/news/press-releases', pathMatch: 'full' },
                ]
            },
            { path: '**', redirectTo: 'press-releases', pathMatch: 'full' },


        ]
    },
    {
        path: 'presenters', component: PagesComponent,
        children: [
            { path: ':id', component: PresentersComponent },
            { path: ':id/:id', component: PresentersComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'blogs', component: PressReleasesComponent,
        children: [
            { path: '**', redirectTo: '/news/press-releases' },
        ]
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AdminModule,
        RouterModule.forRoot(appRoutes,
          // { enableTracing: true }  // For route debugging.
        ),
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule {}
