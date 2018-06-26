export class Page {
    constructor(
      public uid: string,
      public title: string,
      public author: string,
      public date: number,
      public photoURL: string,
      public body: string,
      public category: string
    ) {
    }
}
