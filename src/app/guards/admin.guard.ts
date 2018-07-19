import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AdminRolesService } from '../services/admin-roles.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(
      private rolesService: AdminRolesService,
      private flashMessage: FlashMessagesService,
    ) {
    }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        return this.rolesService.user$.pipe(
          take(1),
          map(user => !!(user && user.roles.admin)),
          tap(isAdmin => {
              if (!isAdmin) {
                  console.error('Access denied - Admins only');
                  this.flashMessage.show(`Access denied - Admins only. Please contact the Web Development team (awhite@gastro.org) for help.`, {
                      cssClass: 'alert-warning',
                      timeout: 10000
                  });
              }
          })
        );

    }
}
