import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './components/admin/admin.module';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { HomeComponent } from './components/core/home/home.component';
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
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'register', component: PagesComponent,
        children: [
            { path: ':id', component: RegisterComponent }
        ]
    },
    {
        path: 'attendee-planning', component: PagesComponent,
        children: [
            { path: ':id', component: AttendeePlanningComponent }
        ]
    },
    {
        path: 'education', component: PagesComponent,
        children: [
            { path: ':id', component: EducationComponent }
        ]
    },
    {
        path: 'exhibitor-information', component: PagesComponent,
        children: [
            { path: ':id', component: ExhibitorInformationComponent }
        ]
    },
    {
        path: 'news', component: PagesComponent,
        children: [
            { path: ':id', component: NewsAndMediaComponent },
            {
                path: 'press-releases', component: PressReleasesComponent,
                children: [
                    { path: ':id', component: PressReleasesDetailsComponent },
                ]
            },
        ]
    },
    {
        path: 'presenters', component: PagesComponent,
        children: [
            { path: ':id', component: PresentersComponent }
        ]
    },
    // {
    //     path: 'press-releases', component: PressReleasesComponent,
    //     children: [
    //         { path: ':id', component: PressReleasesDetailsComponent },
    //     ]
    // },

    { path: '**', redirectTo: '/home', pathMatch: 'full' },
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
