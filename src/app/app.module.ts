import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import * as firebase from 'firebase/app';
import { BsDatepickerModule, ProgressbarModule } from 'ngx-bootstrap';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { HomeComponent } from './components/core/home/home.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { DropZoneDirective } from './directives/drop-zone.directive';
import { AdminAdsService } from './services/admin-ads.service';
import { AdminCardService } from './services/admin-card.service';
import { AdminMetaService } from './services/admin-meta.service';
import { AdminSettingsService } from './services/admin-settings.service';
import { AdminService } from './services/admin.service';
import { AuthService } from './services/auth.service';
import { AdminPageService } from './services/admin-page.service';
import { AdminUserService } from './services/admin-user.service';
import { CountdownService } from './services/countdown.service';
import { PageService } from './services/page.service';
import { AttendeePlanningComponent } from './components/pages/attendee-planning/attendee-planning.component';
import { EducationComponent } from './components/pages/education/education.component';
import { ExhibitorInformationComponent } from './components/pages/exhibitor-information/exhibitor-information.component';
import { NewsAndMediaComponent } from './components/pages/news-and-media/news-and-media.component';
import { PresentersComponent } from './components/pages/presenters/presenters.component';

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
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase, 'ddw-org'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AppRoutingModule,
        BsDatepickerModule.forRoot(),
        ProgressbarModule.forRoot(),
        FlashMessagesModule.forRoot(),
        MatSnackBarModule
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
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
