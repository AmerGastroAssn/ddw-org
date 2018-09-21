export class Page {
    constructor(
      public $key: string,
      public uid: string,
      public title: string,
      public body: string,
      public author: string,
      public date: number,
      public photoURL: string,
      public bannerPhotoURL: string,
      public category: string,
      public published: boolean,
      public template: string,
      public url: string,
      public slug: string,
      public sortOrder: number,
      public hasCalendar: boolean,
      public calendarTitle: string,
      public isGrandchildPage: boolean,
      public grandchildURL: string,
      public hidden: boolean,
      public extURL: string,
      public isExtURL: boolean,
      public metaDesc: string,
    ) {
    }
}
