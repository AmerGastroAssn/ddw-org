import { FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Page } from '../models/Page';
import { AdminPageService } from '../services/admin-page.service';

export class PageValidators {
    pagesCollection: AngularFirestoreCollection<Page>;
    pages$: Observable<Page[]>;
    page: Page;

    // constructor(
    //   private adminPageService: AdminPageService,
    //   private afs: AngularFirestore,
    // ) {
    //
    // }
    //
    // duplicatePage(control: FormControl): { [str: string]: boolean } {
    //     this.getPages()
    //         .subscribe((pageList) => {
    //             pageList.forEach((page) => {
    //                 switch (control.value) {
    //                     case page.title:
    //                         return { 'This title has already been used. Please edit that page or rename this page.': true };
    //                     case 'asdf':
    //                         return { 'invalidProjectName': true };
    //                     case 'colper':
    //                         return { 'invalidProjectName': true };
    //                     case 'default':
    //                         return { 'invalidProjectName': true };
    //                     default:
    //                         return null;
    //                 }
    //             });
    //         });
    //
    //
    //     // EXAMPLE WITHOUT SWITCH
    //     /*
    //      if (control.value === 'Test') {
    //      return { 'invalidProjectName': true };
    //      } else {
    //      return null;
    //      }
    //      */
    //
    // }
    // getPages(): Observable<Page[]> {
    //     return this.afs.collection<Page>('pages').valueChanges();
    // }


}
