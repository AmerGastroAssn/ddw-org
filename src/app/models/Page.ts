export class Page {
    constructor(
      public $key: string,
      public uid: string,
      public title: string,
      public body: string,
      public author: string,
      public date: number,
      public photoURL: string,
      public category: string,
      public published: boolean,
      public template: string
    ) {
    }
}
