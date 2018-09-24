import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'ddw-admin-image-uploader',
    templateUrl: './admin-image-uploader.component.html',
    styleUrls: ['./admin-image-uploader.component.css']
})
export class AdminImageUploaderComponent implements OnInit {
    // Image upload
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
    ) {
    }

    uploadImage(event) {
        const customMetadata = { app: 'DDW.org' };
        // The File object
        const file = event.target.files[0];
        // Client-side validation example
        if (file.type.split('/')[0] !== 'image') {
            this.sbAlert.open('That file type is not supported :(', 'Dismiss', {
                duration: 3000,
                verticalPosition: 'bottom',
                panelClass: ['snackbar-danger']
            });
            console.error('unsupported file type :( ');
            this.isInvalid = true;
            return;
        }
        // The storage path
        const path = `pageImages/${new Date().getTime()}_${file.name}`;
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
          })
        )
            .subscribe();
    }

    ngOnInit() {
    }

}
