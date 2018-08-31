import { Component, OnInit } from '@angular/core';
import { AdminSettingsService } from './services/admin-settings.service';

@Component({
    selector: 'ddw-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(
      private settingsService: AdminSettingsService,
    ) {
        this.settingsService.getSettings()
            .subscribe((settings) => {
                this.settingsService.saveLocalSettings(settings);
            });
    }

    ngOnInit() {

    }
}
