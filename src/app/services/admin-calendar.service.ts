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

    getAllCalendars(): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar');
        return this.calendars$ = this.calendarCollection.valueChanges();
    }

    getCalendarByTitle(title: string): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar', ref => {
            return ref.where('title', '==', `${title}`);
        });
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

    getCalColumnValues(): Observable<CalColumnValues> {
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


    updateCalendar(formData, id): object {
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${id}`);

        const data: Calendar = {
            $key: id,
            body1: formData.body1,
            body2: formData.body2,
            body3: formData.body3,
            body4: formData.body4,
            date1: formData.date1,
            date2: formData.date2,
            date3: formData.date3,
            date4: formData.date4,
            title: formData.title,
            displayName: formData.displayName,
            uid: id,
        };

        console.log('data', data);
        return calRef.set(data, { merge: true })
                     .then(() => {
                         this.router.navigate(['/admin/calendar']);
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Event updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    saveCalendar(formData): object {
        const new$key = this.afs.createId();
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${new$key}`);

        const data: Calendar = {
            $key: new$key,
            body1: formData.body1,
            body2: formData.body2,
            body3: formData.body3,
            body4: formData.body4,
            date1: formData.date1,
            date2: formData.date2,
            date3: formData.date3,
            date4: formData.date4,
            title: formData.title,
            displayName: formData.displayName,
            uid: new$key,
        };

        console.log('data', data);
        return calRef.set(data)
                     .then(() => {
                         this.router.navigate(['/admin/calendar']);
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Event updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    updateCalendar2(formData): object {
        const calRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${formData.$key}`);

        const data: Calendar = {
            $key: formData.$key,
            body1: formData.body1,
            body2: formData.body2,
            body3: formData.body3,
            body4: formData.body4,
            date1: formData.date1,
            date2: formData.date2,
            date3: formData.date3,
            date4: formData.date4,
            title: formData.title,
            displayName: formData.displayName,
            uid: formData.uid,
        };
        return calRef.update(data)
                     .then(() => {
                         this.router.navigate(['/admin/calendar']);
                         this.sbAlert.open('Calendar Event was Updated!', 'Dismiss', {
                             duration: 3000,
                             verticalPosition: 'bottom',
                             panelClass: ['snackbar-success']
                         });
                         console.log('Calendar Event updated', data);
                     })
                     .catch((error) => console.log(`ERROR~uC: `, error));
    }

    updateCalColumnValues(formData): object {
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
