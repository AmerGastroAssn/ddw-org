import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Calendar } from '../models/Calendar';

@Injectable({
    providedIn: 'root'
})
export class AdminCalendarService {
    calendarCollection: AngularFirestoreCollection<Calendar>;
    calendarDoc: AngularFirestoreDocument<Calendar>;
    calendar: Observable<Calendar>;
    calendars: Observable<Calendar[]>;
    cal1$key: string;
    cal2$key: string;
    cal3$key: string;
    cal4$key: string;
    cal5$key: string;
    cal6$key: string;
    cal7$key: string;

    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {
        this.cal1$key = 'yEBpoMz6UGdnxdoLk0Rm';
        this.cal2$key = 'ecujpEwF9Hw9ZgMwHQS3';
        this.cal3$key = 'PVw0Bj4QNusSdzXPc6xI';
        this.cal4$key = 'Yb4CzGFdZCS5ML9tzvVp';
        this.cal5$key = 'zCAU2hHpt5iF7imV62oe';
        this.cal6$key = 'ONhrQkIjAoK6sM0wGMcs';
        this.cal7$key = 's8yNsQlMYvvMBOIlBCQE';
    }

    getAllCalendar(): Observable<Calendar[]> {
        this.calendarCollection = this.afs.collection<Calendar>('calendar');
        return this.calendars = this.calendarCollection.valueChanges();
    }

    getCalendar1(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal1$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }

    getCalendar2(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal2$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }


    getCalendar3(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal3$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }


    getCalendar4(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal4$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }


    getCalendar5(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal5$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }


    getCalendar6(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal6$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }


    getCalendar7(): Observable<Calendar> {
        this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal7$key}`);
        this.calendar = this.calendarDoc.snapshotChanges().map((action) => {
            if (action.payload.exists === false) {
                return null;
            } else {
                const data = action.payload.data() as Calendar;
                data.$key = action.payload.id;
                return data;
            }
        });
        return this.calendar;
    }

    updateCalendar(formData) {
        const pageRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${formData.$key}`);
        const timestampToNum = formData.date.getTime();

        const data: Calendar = {
            $key: formData.$key,
            body: formData.body,
            date: timestampToNum,
            time: formData.time,
            uid: formData.uid,
        };
        return pageRef.update(data)
                      .then(() => {
                          this.sbAlert.open('Calendar Event was Saved!', 'Dismiss', {
                              duration: 3000,
                              verticalPosition: 'bottom',
                              panelClass: ['snackbar-success']
                          });
                          console.log('Calendar Event updated', data);
                      })
                      .catch((error) => console.log(`ERROR~uC: `, error));
    }


    // updateCalendar1(updatedCalendar): void {
    //     this.calendarDoc = this.afs.doc<Calendar>(`calendar/${this.cal1$key}`);
    //
    //     this.calendarDoc.update(updatedCalendar)
    //         .then(() => {
    //             this.sbAlert.open('Calendar was Saved!', 'Dismiss', {
    //                 duration: 3000,
    //                 verticalPosition: 'bottom',
    //                 panelClass: ['snackbar-success']
    //             });
    //             console.log('Calendar updated', updatedCalendar);
    //         })
    //         .catch((error) => {
    //             this.sbAlert.open('Calendar was NOT Saved.', 'Dismiss', {
    //                 duration: 3000,
    //                 verticalPosition: 'bottom',
    //                 panelClass: ['snackbar-danger']
    //             });
    //             console.log(`ERROR~uM: `, error);
    //         });
    // }
}
