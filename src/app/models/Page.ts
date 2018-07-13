import { toDate } from '@angular/common/src/i18n/format_date';

export class Page {
    constructor(
      public $key: string,
      public uid: string,
      public title: string,
      public body: string,
      public author: string,
      public date: any,
      public photoURL: string,
      public category: string,
      public published: boolean,
      public template: string
    ) {
    }
}
