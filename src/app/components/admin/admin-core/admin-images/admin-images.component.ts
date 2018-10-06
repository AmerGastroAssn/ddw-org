import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ngCopy } from 'angular-6-clipboard';
import { Observable } from 'rxjs';
import { Image } from '../../../../models/Image';
import { AdminImageService } from '../../../../services/admin-image.service';

@Component({
    selector: 'ddw-admin-images',
    templateUrl: './admin-images.component.html',
    styleUrls: ['./admin-images.component.css']
})
export class AdminImagesComponent implements OnInit {
    images$: Observable<Image[]>;
    showDetailsToggle = [];
    url: string;


    constructor(
      private imageService: AdminImageService,
      private sbAlert: MatSnackBar,
    ) {
    }

    ngOnInit() {
        this.images$ = this.imageService.getImages();
    }

    onToggleDetails(i) {
        this.showDetailsToggle[i] = !this.showDetailsToggle[i];
    }

    onToggleCopy(url) {
        ngCopy(url);
        this.sbAlert.open('Image URL Copied to clipboard!', 'Dismiss', {
            duration: 1500,
            verticalPosition: 'bottom',
            panelClass: ['snackbar-info']
        });
    }

}
