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
        if (this.settingsService.getAdminSettings() !== null) {
            if (this.settingsService.getAdminSettings().allowSignup === true && this.settingsService.getAdminSettings().allowSignup !== null) {
                return true;
            } else {
                this.router.navigate(['/admin/login']);
                this.flashMessage.show(`Sorry, you do not have sufficient privileges. Please contact the Web team for help.`, {
                    cssClass: 'alert-warning',
                    timeout: 5000
                });
                return false;
            }
        } else {
            window.location.reload();
            this.router.navigate(['home']);
            this.flashMessage.show(`Sorry, you do not have sufficient privileges. Please contact the Web team for help.`, {
                cssClass: 'alert-warning',
                timeout: 5000
            });
        }
    }

}