export class PressRelease {
    constructor(
      public $key: string,
      public author: string,
      public createdAt: number,
      public body: string,
      public sortOrder: number,
      public published: boolean,
      public publishOn: any,
      public summary: string,
      public title: string,
      public uid: string,
      public url: string,
      public metaDesc: string,
    ) {
    }
}
