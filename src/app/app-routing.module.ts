import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './components/admin/admin.module';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { HomeComponent } from './components/core/home/home.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { PrivacyPolicyComponent } from './components/core/privacy-policy/privacy-policy.component';
import { AttendeePlanningComponent } from './components/pages/attendee-planning/attendee-planning.component';
import { EducationComponent } from './components/pages/education/education.component';
import { ExhibitorInformationComponent } from './components/pages/exhibitor-information/exhibitor-information.component';
import { NewsAndMediaComponent } from './components/pages/news-and-media/news-and-media.component';
import { PagesComponent } from './components/pages/pages.component';
import { PresentersComponent } from './components/pages/presenters/presenters.component';
import { PressReleasesDetailsComponent } from './components/pages/press-releases/press-releases-details/press-releases-details.component';
import { PressReleasesComponent } from './components/pages/press-releases/press-releases.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { RedirectGuard } from './guards/redirect.guard';


const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'contactus', component: ContactUsComponent, data: { title: 'Contact Us' } },
    { path: 'privacy', component: PrivacyPolicyComponent, data: { title: 'Privacy Policy' } },
    { path: 'not-found', component: NotFoundComponent, data: { title: 'Page Not Found' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'register', component: PagesComponent,
        children: [
            { path: 'housing-travel-host', redirectTo: 'host-city-travel-arrangements', pathMatch: 'full' },
            { path: 'international', redirectTo: 'international-attendees', pathMatch: 'full' },
            {
                path: 'international/invitation-letter',
                redirectTo: 'international-attendees/request-invitation-letter',
                pathMatch: 'full'
            },
            { path: 'guide', redirectTo: 'first-time-attendee-guide', pathMatch: 'full' },
            { path: 'guide/next-steps', redirectTo: 'first-time-attendee-guide/step-two', pathMatch: 'full' },
            {
                path: 'guide/next-steps3',
                redirectTo: 'first-time-attendee-guide/steps-three-and-four',
                pathMatch: 'full'
            },
            { path: 'registration/fees', redirectTo: 'registration/registration-fees', pathMatch: 'full' },
            { path: 'checklist', redirectTo: 'registration-checklist', pathMatch: 'full' },
            { path: ':id', component: RegisterComponent },
            { path: ':id/:id', component: RegisterComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'attendee-planning', component: PagesComponent,
        children: [
            { path: 'resources', redirectTo: 'program-planning-resources', pathMatch: 'full' },
            { path: 'exhibit-hall', redirectTo: 'scope-out-the-exhibit-hall', pathMatch: 'full' },
            { path: 'networking', redirectTo: 'networking-events', pathMatch: 'full' },
            { path: ':id', component: AttendeePlanningComponent },
            { path: ':id/:id', component: AttendeePlanningComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'education', component: PagesComponent,
        children: [
            { path: 'sessions', redirectTo: 'scientific-sessions', pathMatch: 'full' },
            { path: 'posterhall', redirectTo: 'poster-hall', pathMatch: 'full' },
            { path: 'cme', redirectTo: 'cme-credit-certificate-of-attendance', pathMatch: 'full' },
            { path: ':id', component: EducationComponent },
            { path: ':id/:id', component: EducationComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'exhibitor-information', component: PagesComponent,
        children: [
            { path: 'reserve', redirectTo: 'reserve-your-space', pathMatch: 'full' },
            { path: 'policies', redirectTo: 'exhibitor-policies', pathMatch: 'full' },
            { path: 'onsite-meeting', redirectTo: 'host-an-on-site-meeting', pathMatch: 'full' },
            {
                path: 'floor-plan',
                canActivate: [RedirectGuard],
                component: RedirectGuard,
                data: { externalUrl: 'http://s23.a2zinc.net/clients/DDW/DDW19/Public/EventMap.aspx?shavailable=1' }
            },
            {
                path: 'exhibitor-portal',
                canActivate: [RedirectGuard],
                component: RedirectGuard,
                data: { externalUrl: 'http://s23.a2zinc.net/clients/DDW/DDW19/Public/Enter.aspx' }
            },
            {
                path: 'onsite-meeting/product-theater',
                redirectTo: 'host-an-on-site-meeting/product-theater',
                pathMatch: 'full'
            },
            {
                path: 'onsite-meeting/satellite-symposia',
                redirectTo: 'host-an-on-site-meeting/satellite-symposia',
                pathMatch: 'full'
            },            {
                path: 'reserve-your-space',
                redirectTo: 'book-your-exhibit-space',
                pathMatch: 'full'
            },
            { path: ':id', component: ExhibitorInformationComponent },
            { path: ':id/:id', component: ExhibitorInformationComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'news', component: PagesComponent,
        children: [
            { path: 'onsite-news', redirectTo: 'ddw-news', pathMatch: 'full' },
            { path: 'press', redirectTo: 'press-room', pathMatch: 'full' },
            { path: 'releases', redirectTo: 'press-releases', pathMatch: 'full' },
            { path: 'guidelines', redirectTo: 'guidelines-license-for-use-of-ddw-content', pathMatch: 'full' },
            { path: ':id', component: NewsAndMediaComponent },
            {
                path: '', component: PressReleasesComponent,
                children: [
                    { path: 'press-releases', component: PressReleasesComponent },
                    { path: 'press-releases/:id', component: PressReleasesDetailsComponent },
                    { path: ':id/:id', component: NewsAndMediaComponent },
                    { path: '**', redirectTo: '/news/press-releases', pathMatch: 'full' },
                ]
            },
            { path: '**', redirectTo: '/news/press-releases', pathMatch: 'full' },
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
        path: 'presenter', component: PagesComponent,
        children: [
            { path: 'submit', redirectTo: '/presenters/submit-an-abstract', pathMatch: 'full' },
            { path: 'travel-awards', redirectTo: '/presenters/travel-awards', pathMatch: 'full' },
            { path: 'presenter-resources', redirectTo: '/presenters/presenter-resources', pathMatch: 'full' },
            {
                path: 'presenter-resources/poster-presenter-guidelines',
                redirectTo: '/presenters/presenter-resources/poster-presenter-guidelines',
                pathMatch: 'full'
            },
            {
                path: 'presenter-resources/lecture-presenter-guidelines',
                redirectTo: '/presenters/presenter-resources/poster-presenter-guidelines',
                pathMatch: 'full'
            },
            {
                path: 'presenter-resources/moderator-guidelines',
                redirectTo: '/presenters/presenter-resources/moderator-guidelines',
                pathMatch: 'full'
            },
            { path: ':id', component: PresentersComponent },
            { path: ':id/:id', component: PresentersComponent },
            { path: '**', redirectTo: '/home', pathMatch: 'full' },
        ]
    },
    {
        path: 'blogs', component: PressReleasesComponent,
        children: [
            {
                path: 'aimee-frank/2018/06/05/ddw-monumental-research-alerts',
                redirectTo: '/news/press-releases/listening-to-gut-noises-could-improve-diagnosis-of-irritable-bowel-syndrome',
                pathMatch: 'full'
            },


            {
                path: 'aimee-frank/2018/06/05/listening-to-gut-noises-could-improve-diagnosis-of',
                redirectTo: '/news/press-releases/ddw-monumental-research-alerts',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/06/05/money-or-altruism-what-motivates-people-to-donate',
                redirectTo: '/news/press-releases/money-or-altruism-what-motivates-people-to-donate-their-poop-to-medicine',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/05/24/dna-based-vaccine-treatment-for-colorectal-cancer',
                redirectTo: '/news/press-releases/blue-dye-tablet-helps-identify-polyps-during-colonoscopy',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/05/24/more-patients-with-severe-alcoholic-hepatitis-rece',
                redirectTo: '/news/press-releases/dna-based-vaccine-treatment-for-colorectal-cancer-to-undergo-first-human-study',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/05/24/experimental-drug-eases-effects-of-gluten-for-celi',
                redirectTo: '/news/press-releases/experimental-drug-eases-effects-of-gluten-for-celiac-patients-on-gluten-free-diet',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/05/24/blue-dye-tablet-helps-identify-polyps-during-colon',
                redirectTo: '/news/press-releases/more-patients-with-severe-alcoholic-hepatitis-receiving-liver-transplants',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/05/15/digestive-disease-week-ddw-2018-media-briefing-pre',
                redirectTo: '/news/press-releases/digestive-disease-week-2018-media-briefing-previewing-the-latest-research-hot-topics',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2018/02/13/ddw-2018-offers-reporters-access-to-leading-resear',
                redirectTo: '/news/press-releases/ddw-2018-offers-reporters-access-to-leading-research-in-digestive-health',
                pathMatch: 'full'
            },
            {  // tslint:disable-next-line:max-line-length
                path: 'aimee-frank/2017/06/26/digestive-disease-week-2017-was-the-largest-international-meeting-in-gastroenterology-and-hepatology',
                // tslint:disable-next-line:max-line-length
                redirectTo: '/news/press-releases/digestive-disease-week-2017-was-the-largest-international-meeting-in-gastroenterology-and-hepatology',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/05/09/non-surgical-weight-loss-treatment-found-safe-effective-for-those-with-limited-options',
                redirectTo: '/news/press-releases/first-ever-autonomously-controlled-capsule-robot-explores-colon',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/05/07/a-unique-enzyme-could-be-a-game-changer-for-gluten-sensitive-patients',
                redirectTo: '/news/press-releases/a-unique-enzyme-could-be-a-game-changer-for-gluten-sensitive-patients',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/05/07/non-surgical-weight-loss-treatment-found-safe-effective-for-those-with-limited-options',
                redirectTo: '/news/press-releases/non-surgical-weight-loss-treatment-found-safe-effective-for-those-with-limited-options',
                pathMatch: 'full'
            },
            {
                // tslint:disable-next-line:max-line-length
                path: 'aimee-frank/2017/05/06/study-identifies-genetic-markers-that-predict-which-patients-with-hepatitis-c-and-cirrhosis-will-improve-with-treatment',
                // tslint:disable-next-line:max-line-length
                redirectTo: '/news/press-releases/study-identifies-genetic-markers-that-predict-which-patients-with-hepatitis-c-and-cirrhosis-will-improve-with-treatment',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/04/20/ddw-2017-telebriefing-preview-the-latest-research-hot-topics',
                redirectTo: '/news/press-releases/ddw-2017-telebriefing-to-preview-the-latest-research-hot-topics',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/03/20/ddw-2017-offers-reporters-access-to-leading-research-in-digestive-health',
                redirectTo: '/news/press-releases/ddw-2017-offers-reporters-access-to-leading-research-in-digestive-health',
                pathMatch: 'full'
            },
            {
                path: 'aimee-frank/2017/03/01/ddw-website-receives-honorable-mention-for-ava-digital-award',
                redirectTo: '/news/press-releases/ddw-website-receives-honorable-mention-for-ava-digital-award',
                pathMatch: 'full'
            },
            {
                // tslint:disable-next-line:max-line-length
                path: 'aimee-frank/2017/02/02/digestive-disease-week-responds-to-executive-order-banning-travel-of-nationals-from-seven-countries',
                // tslint:disable-next-line:max-line-length
                redirectTo: '/news/press-releases/digestive-disease-week-responds-to-executive-order-banning-travel-of-nationals-from-seven-countries',
                pathMatch: 'full'
            },
            {
                path: 'rachel-shubert/2017/01/09/ddw-tv-returns-to-digestive-disease-week-2017',
                redirectTo: '/news/press-releases/ddw-tv-returns-to-digestive-disease-week-2017',
                pathMatch: 'full'
            },
            { path: '**', redirectTo: '/news/press-releases' },
        ]
    },
    { path: 'resources', redirectTo: '/attendee-planning/program-planning-resources', pathMatch: 'full' },
    { path: 'abstracts', redirectTo: '/presenters/submit-an-abstract', pathMatch: 'full' },
    { path: 'ddwwebsite/education/abstracts', redirectTo: '/education/abstracts', pathMatch: 'full' },
    { path: 'ddwwebsite/register/registration', redirectTo: '/register/registration', pathMatch: 'full' },
    { path: 'ddwwebsite/attendee-planning/tracks', redirectTo: '/attendee-planning/ddw-tracks', pathMatch: 'full' },
    { path: 'ddwwebsite/attendee-planning/mobile-app', redirectTo: '/attendee-planning/mobile-app', pathMatch: 'full' },
    { path: 'registration', redirectTo: '/register/registration', pathMatch: 'full' },
    { path: 'fees', redirectTo: '/register/registration/registration-fees', pathMatch: 'full' },
    { path: 'tracks', redirectTo: '/attendee-planning/ddw-tracks', pathMatch: 'full' },
    { path: 'socialmedia', redirectTo: '/news/social-media', pathMatch: 'full' },
    { path: 'cme', redirectTo: '/education/cme-credit-certificate-of-attendance', pathMatch: 'full' },
    { path: 'exhibits', redirectTo: '/exhibitor-information/reserve-your-space', pathMatch: 'full' },
    { path: 'international', redirectTo: '/register/international-attendees', pathMatch: 'full' },
    { path: 'mobileapp', redirectTo: '/attendee-planning/mobile-app', pathMatch: 'full' },
    { path: 'hostcity', redirectTo: '/register/host-city-travel-arrangements', pathMatch: 'full' },
    { path: 'housing', redirectTo: '/register/housing', pathMatch: 'full' },
    { path: 'press', redirectTo: '/news/press-room', pathMatch: 'full' },
    { path: 'awards', redirectTo: '/presenters/travel-awards', pathMatch: 'full' },
    { path: 'posters', redirectTo: '/education/poster-hall', pathMatch: 'full' },
    { path: 'guide', redirectTo: '/register/first-time-attendee-guide', pathMatch: 'full' },
    { path: 'networking', redirectTo: '/attendee-planning/networking-events', pathMatch: 'full' },
    { path: 'exhibithall', redirectTo: '/attendee-planning/scope-out-the-exhibit-hall', pathMatch: 'full' },
    { path: 'ddwwebsite/:id/:id', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: NotFoundComponent },


    // REDIRECTS:

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
