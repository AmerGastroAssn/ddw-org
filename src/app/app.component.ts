import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AdminSettingsService } from './services/admin-settings.service';

@Component({
    selector: 'ddw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
      private settingsService: AdminSettingsService,
      private router: Router,
    ) {
        this.settingsService.getSettings()
            .subscribe((settings) => {
                this.settingsService.saveLocalSettings(settings);
            });
    }

    ngOnInit() {
        // Makes pages scroll to top of page on routerLink navigation.
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });
    }
}
