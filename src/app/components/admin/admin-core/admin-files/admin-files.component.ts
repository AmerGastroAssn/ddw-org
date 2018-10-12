import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { ngCopy } from 'angular-6-clipboard';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, Subject } from 'rxjs-compat';
import { AdminFileService } from '../../../../services/admin-file.service';

@Component({
    selector: 'ddw-admin-files',
    templateUrl: './admin-files.component.html',
    styleUrls: ['./admin-files.component.css'],
})
export class AdminFilesComponent implements OnInit {
    allFiles: any;
    files: any;
    showDetailsToggle = [];
    url: string;
    searchTerm: string;
    startAt = new Subject();
    endAt = new Subject();
    startObs = this.startAt.asObservable();
    endObs = this.endAt.asObservable();
    fileType: string;

    selectedViewNumber = 25;
    viewNumber: any[] = [
        { value: 25, type: 25 },
        { value: 50, type: 50 },
        { value: 100, type: 100 },
        { value: 200, type: 200 },
    ];


    constructor(
      private fileService: AdminFileService,
      private sbAlert: MatSnackBar,
      private afs: AngularFirestore,
    ) {
    }

    ngOnInit() {
        this.fileService.getFileByCreatedAt()
            .subscribe((files) => this.files = files);
        Observable.combineLatest(this.startObs, this.endObs)
                  .subscribe((value) => {
                      this.fileService.getFiles(value[0], value[1])
                          .subscribe((files) => {
                              this.files = files;
                          });
                  });

    }

    onToggleDetails(i) {
        this.showDetailsToggle[i] = !this.showDetailsToggle[i];
    }

    onToggleCopy(url) {
        ngCopy(url);
        this.sbAlert.open('File URL Copied to clipboard!', 'Dismiss', {
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
            this.fileService.getFileByCreatedAt()
                .subscribe((files) => this.files = files);
        } else {
            this.fileService.getFileBySortAmount(selectedAmount)
                .subscribe((files) => this.files = files);
        }
    }


}
