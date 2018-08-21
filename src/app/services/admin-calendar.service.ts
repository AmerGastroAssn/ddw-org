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
    calendar$: Observable<Calendar>;
    calendars$: Observable<Calendar[]>;
    $key: string;


    constructor(
      private afs: AngularFirestore,
      private router: Router,
      private flashMessage: FlashMessagesService,
      public sbAlert: MatSnackBar,
    ) {

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


    updateCalendar(formData) {
        const pageRef: AngularFirestoreDocument<Calendar> = this.afs.doc(`calendar/${formData.$key}`);
        const stampDateNum = formData.date.getTime();
        const stampStartNum = formData.startTime.getTime();
        const stampEndNum = formData.endTime.getTime();

        const data: Calendar = {
            $key: formData.$key,
            body: formData.body,
            date: stampDateNum,
            column: formData.column,
            startTime: stampStartNum,
            endTime: stampEndNum,
            title: formData.title,
            uid: formData.uid,
        };
        return pageRef.update(data)
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

}
