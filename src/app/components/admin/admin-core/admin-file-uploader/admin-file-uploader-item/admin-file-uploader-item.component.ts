import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AdminFileService } from '../../../../../services/admin-file.service';

@Component({
    selector: 'ddw-admin-file-uploader-item',
    templateUrl: './admin-file-uploader-item.component.html',
    styleUrls: ['./admin-file-uploader-item.component.css']
})
export class AdminFileUploaderItemComponent implements OnInit {
    // File upload
    task: AngularFireUploadTask;
    // Progress monitoring
    percentage: Observable<number>;
    snapshot: Observable<any>;
    // Download URL
    downloadURL: Observable<string>;
    isInvalid: boolean;

    constructor(
      private storage: AngularFireStorage,
      private sbAlert: MatSnackBar,
      private fileService: AdminFileService,
    ) {
    }

    uploadFile(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.name.split('.').pop() !== 'pdf') {
            this.sbAlert.open(`That file type is not supported :(`, 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageFiles/${new Date().getTime()}_${file.name.replace(/\s/g, '_').toLowerCase()}`;
        const fileRef = this.storage.ref(path);
        // The main task
        this.task = this.storage.upload(path, file, { customMetadata });
        // Progress monitoring
        this.percentage = this.task.percentageChanges();
        this.snapshot = this.task.snapshotChanges();
        // The file's download URL
        this.task.snapshotChanges().pipe(
          finalize(() => {
              this.downloadURL = fileRef.getDownloadURL();
              this.downloadURL.subscribe((fileURL) => {
                  this.fileService.setFile(fileURL, file.name.replace(/\s/g, '_').toLowerCase())
                      .then(() => {
                          this.sbAlert.open('File has been added!', 'Dismiss', {
                              duration: 3000,
                              verticalPosition: 'bottom',
                              panelClass: ['snackbar-success']
                          });
                      })
                      .catch((error) => console.log('Problem sending file to service', error));
              });


          })
        )
            .subscribe();
    }

    ngOnInit() {
    }
}
