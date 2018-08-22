import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { CalColumnValues } from '../models/CalColumnValues';
import { Calendar } from '../models/Calendar';

@Injectable({
    providedIn: 'root'
})
export class AdminCalendarService {
    calendarCollection: AngularFirestoreCollection<Calendar>;
    calendarDoc: AngularFirestoreDocument<Calendar>;
    calendar$: Observable<Calendar>;
    calendars$: Observable<Calendar[]>;
    calColumnValueCollection: AngularFirestoreCollection<CalColumnValues>;
    calColumnValuesDoc: AngularFirestoreDocument<CalColumnValues>;
    calColumnValue$: Observable<CalColumnValues>;
    calColumnValues$: Observable<CalColumnValues[]>;

    $key: string;
    calColumnValue$key: string;

    stampDateNum: any;
    stampStartNum: any;
    stampEndNum: any;


    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.calColumnValue$key = 'BYowCajpbtyWUMVCWDUY';
    }

    getAllCalendarEvents(): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar');
        return this.calendars$ = this.calendarCollection.valueChanges();
    }

    getCalendar(key: string): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${key}`);
        this.calendar$ = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar$;
    }

    getCalColumnValues() {
        this.calColumnValuesDoc = this.afs.doc<CalColumnValues>(`calColumnValues/${this.calColumnValue$key}`);
        this.calColumnValue$ = this.calColumnValuesDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as CalColumnValues;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calColumnValue$;

    }

    saveCalendar(formData) {
        const new$key = this.afs.createId();
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${new$key}`);
        const stampDateNum = formData.date.getTime();
        const stampStartNum = formData.startTime.getTime();
        const stampEndNum = formData.endTime.getTime();


        const data: Calendar = {
            $key: new$key,
            body: formData.body,
            date: stampDateNum,
            column: formData.column,
            startTime: stampStartNum,
            endTime: stampEndNum,
            title: formData.title,
            uid: new$key,
        };
        return calRef.set(data)
                     .then(() => {
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Event updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));


    }

    updateCalendar(formData) {
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${formData.$key}`);
        /*------------------------------------------------
         Checks to make sure timestamps are converted to numbers.
         Numbers are needed for querying (Timestamps make it difficult.
         ------------------------------------------------*/
        if (typeof formData.date === 'number') {
            this.stampDateNum = formData.date;
        } else {
            this.stampDateNum = formData.date.getTime();
        }
        if (typeof formData.startTime === 'number') {
            this.stampStartNum = formData.startTime;
        } else {
            this.stampStartNum = formData.startTime.getTime();
        }
        if (typeof formData.endTime === 'number') {
            this.stampEndNum = formData.endTime;
        } else {
            this.stampEndNum = formData.endTime.getTime();
        }
        const data: Calendar = {
            $key: formData.$key,
            body: formData.body,
            date: this.stampDateNum,
            column: formData.column,
            startTime: this.stampStartNum,
            endTime: this.stampEndNum,
            title: formData.title,
            uid: formData.uid,
        };
        return calRef.update(data)
                     .then(() => {
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Event updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    updateCalColumnValues(formData) {
        const colRef: AngularFirestoreDocument<CalColumnValues> = this.afs.doc(`calColumnValues/${this.calColumnValue$key}`);

        const data: CalColumnValues = {
            $key: this.calColumnValue$key,
            column1: formData.column1,
            column2: formData.column2,
            column3: formData.column3,
            column4: formData.column4,
            uid: this.calColumnValue$key,
        };
        return colRef.update(data)
                     .then(() => {
                         this.sbAlert.open('Calendar Column Values Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Column Values updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

}
