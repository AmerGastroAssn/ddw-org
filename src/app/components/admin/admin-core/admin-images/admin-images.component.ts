import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ngCopy } from 'angular-6-clipboard';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs-compat';
import { AdminImageService } from '../../../../services/admin-image.service';

@Component({
    selector: 'ddw-admin-images',
    templateUrl: './admin-images.component.html',
    styleUrls: ['./admin-images.component.css'],
})
export class AdminImagesComponent implements OnInit {
    allImages: any;
    images: any;
    showDetailsToggle = [];
    url: string;
    searchTerm: string;
    startAt = new Subject();
    endAt = new Subject();
    startObs = this.startAt.asObservable();
    endObs = this.endAt.asObservable();

    selectedViewNumber = 25;
    viewNumber: any[] = [
        { value: 25, type: 25 },
        { value: 50, type: 50 },
        { value: 100, type: 100 },
        { value: 200, type: 200 },
    ];


    constructor(
      private imageService: AdminImageService,
      private sbAlert: MatSnackBar,
      private afs: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.imageService.getImageByCreatedAt()
            .subscribe((images) => this.images = images);
        Observable.combineLatest(this.startObs, this.endObs)
                  .subscribe((value) => {
                      this.imageService.getSearchedImages(value[0], value[1])
                          .subscribe((images) => {
                              this.images = images;
                          });
                  });

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

    search($event) {
        const query = $event.target.value.toLowerCase();
        if (query !== '') {
            this.startAt.next(query);
            this.endAt.next(`${query}\uf8ff`);
            console.log('query', query);
        } else {
            this.sortBy(this.selectedViewNumber);
        }
    }

    sortBy(selectedAmount) {
        if (selectedAmount === 25) {
            this.imageService.getImageByCreatedAt()
                .subscribe((images) => this.images = images);
        } else {
            this.imageService.getImageBySortAmount(selectedAmount)
                .subscribe((images) => this.images = images);
        }
    }


}
