import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import * as firebase from 'firebase/app';
import {
    BsDatepickerModule,
    ModalModule,
    PopoverModule,
    ProgressbarModule,
    TabsModule,
    TimepickerModule
} from 'ngx-bootstrap';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminCalendarItemComponent } from './components/admin/admin-calendar/admin-calendar-item/admin-calendar-item.component';
import { AdminBottomSheetNewComponent } from './components/admin/admin-core/admin-bottom-sheet-new/admin-bottom-sheet-new.component';
import { AdminCardsComponent } from './components/admin/admin-core/admin-cards/admin-cards.component';
// tslint:disable-next-line:max-line-length
import { AdminFeaturedBlogPostsComponent } from './components/admin/admin-core/admin-featured-blog-posts/admin-featured-blog-posts.component';
// tslint:disable-next-line:max-line-length
import { AdminPressReleaseItemComponent } from './components/admin/admin-press-release/admin-press-release-item/admin-press-release-item.component';
import { AdminModule } from './components/admin/admin.module';
import { AlertModalComponent } from './components/core/alert-modal/alert-modal.component';
import { ContactUsComponent } from './components/core/contact-us/contact-us.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HomeComponent } from './components/core/home/home.component';
import { MetaTagsComponent } from './components/core/meta-tags/meta-tags.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { PagesNavbarComponent } from './components/core/pages-navbar/pages-navbar.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';

import { AttendeePlanningComponent } from './components/pages/attendee-planning/attendee-planning.component';

import { EducationComponent } from './components/pages/education/education.component';

import { ExhibitorInformationComponent } from './components/pages/exhibitor-information/exhibitor-information.component';

import { NewsAndMediaComponent } from './components/pages/news-and-media/news-and-media.component';
import { PagesComponent } from './components/pages/pages.component';

import { PresentersComponent } from './components/pages/presenters/presenters.component';
import { PressReleasesDetailsComponent } from './components/pages/press-releases/press-releases-details/press-releases-details.component';
import { PressReleasesComponent } from './components/pages/press-releases/press-releases.component';

import { RegisterComponent } from './components/pages/register/register.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { RunScriptsDirective } from './directives/run-scripts.directive';
import { SafePipe } from './pipes/safe.pipe';
import { AdminAdsService } from './services/admin-ads.service';
import { AdminCalendarService } from './services/admin-calendar.service';
import { AdminCardService } from './services/admin-card.service';
import { AdminCustomNavLinkService } from './services/admin-custom-nav-link.service';
import { AdminFeaturedPostService } from './services/admin-featured-post.service';
import { AdminHomePageService } from './services/admin-home-page.service';
import { AdminMetaService } from './services/admin-meta.service';
import { AdminPageService } from './services/admin-page.service';
import { AdminSettingsService } from './services/admin-settings.service';
import { AdminUserService } from './services/admin-user.service';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { ContactFormService } from './services/contact-form.service';
import { CountdownService } from './services/countdown.service';
import { ModalService } from './services/modal.service';
import { PageService } from './services/page.service';
import { PagesCardService } from './services/pages-card.service';
import { ScriptService } from './services/script.service';


// Inits the app (Fixes a bug).
firebase.initializeApp(environment.firebase);

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NotFoundComponent,
        PagesComponent,
        HomeComponent,
        DropZoneDirective,
        AttendeePlanningComponent,
        EducationComponent,
        ExhibitorInformationComponent,
        NewsAndMediaComponent,
        PresentersComponent,
        AdminCardsComponent,
        MetaTagsComponent,
        AdminFeaturedBlogPostsComponent,
        RunScriptsDirective,
        ContactUsComponent,
        PressReleasesComponent,
        AdminCalendarItemComponent,
        AdminPressReleaseItemComponent,
        PressReleasesDetailsComponent,
        PagesNavbarComponent,
        AlertModalComponent,
        SafePipe,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AppRoutingModule,
        BsDatepickerModule.forRoot(),
        ProgressbarModule.forRoot(),
        FlashMessagesModule.forRoot(),
        PopoverModule.forRoot(),
        MatSnackBarModule,
        Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
        TabsModule.forRoot(),
        TimepickerModule.forRoot(),
        AdminModule,
        HttpClientModule,
        ModalModule.forRoot(),
    ],
    exports: [],
    providers: [
        AdminUserService,
        AdminPageService,
        AuthService,
        AdminSettingsService,
        AdminService,
        AdminMetaService,
        AdminAdsService,
        PageService,
        CountdownService,
        AdminCardService,
        AdminFeaturedPostService,
        ScriptService,
        AdminCalendarService,
        AdminHomePageService,
        ContactFormService,
        ModalService,
        AdminCustomNavLinkService,
        PagesCardService,
    ],
    entryComponents: [
        AdminBottomSheetNewComponent,
        AlertModalComponent
    ],
    bootstrap: [AppComponent],

})
export class AppModule {
}
