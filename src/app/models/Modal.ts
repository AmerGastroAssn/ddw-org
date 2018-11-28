export class Modal {
    constructor(
      public $key: string,
      public author: string,
      public btnText: string,
      public body: string,
      public show: boolean,
      public title: string,
      public uid: string,
      public updatedAt: number,
    ) {
    }
}
