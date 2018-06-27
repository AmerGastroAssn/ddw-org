import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { RegisterPageNewComponent } from './components/admin/admin-pages/register-page-new/register-page-new.component';
import { AdminModule } from './components/admin/admin.module';
import { LoginComponent } from './components/admin/login/login.component';
import { UserComponent } from './components/admin/user/user.component';
import { FooterComponent } from './components/core/footer/footer.component';
import { NavbarComponent } from './components/core/navbar/navbar.component';
import { NotFoundComponent } from './components/core/not-found/not-found.component';
import { SidebarComponent } from './components/core/sidebar/sidebar.component';
import { PagesComponent } from './components/pages/pages.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { PageService } from './services/page.service';
import { UserService } from './services/user.service';


@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        RegisterPageComponent,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NotFoundComponent,
        LoginComponent,
        PagesComponent,
        RegisterPageNewComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp(environment.firebase, 'ddw-org'),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AngularFireStorageModule,
        AppRoutingModule,
        AdminModule
    ],
    providers: [UserService, PageService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
