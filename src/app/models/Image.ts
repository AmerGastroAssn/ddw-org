export class Image {
    constructor(
      public $key: string,
      public author: string,
      public createdAt: number,
      public imageName: string,
      public uid: string,
      public url: string,
    ) {
    }
}
