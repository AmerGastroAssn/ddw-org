import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AdminRegisterPageNewComponent } from './components/admin/admin-pages/admin-register-page-new/admin-register-page-new.component';
import { AdminModule } from './components/admin/admin.module';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminUserComponent } from './components/admin/admin-user/admin-user.component';
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
        AdminUserComponent,
        RegisterPageComponent,
        NavbarComponent,
        FooterComponent,
        SidebarComponent,
        NotFoundComponent,
        AdminLoginComponent,
        PagesComponent,
        AdminRegisterPageNewComponent
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
