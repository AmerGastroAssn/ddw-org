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
      public sortOrder: number,
      public hasCalendar: boolean,
      public calendarTitle: string,
      public extURL?: string,
      public isExtURL?: boolean,
    ) {
    }
}
