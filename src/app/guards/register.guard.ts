import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdminSettingsService } from '../services/admin-settings.service';

@Injectable({
    providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
    constructor(
      private afAuth: AngularFireAuth,
      private router: Router,
      private flashMessage: FlashMessagesService,
      private settingsService: AdminSettingsService
    ) {
    }

    canActivate(): boolean {
        if (this.settingsService.getAdminSettings().allowSignup) {
            return true;
        } else {
            this.router.navigate(['/admin/login']);
            this.flashMessage.show(`Sorry, you do not have sufficient privileges. Please contact the Web Development team (awhite@gastro.org) for help.`, {
                cssClass: 'alert-warning',
                timeout: 10000
            });
            return false;
        }
    }

}
