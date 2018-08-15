export class FeaturedPost {
    constructor(
      public $key: string,
      public uid: string,
      public orderNumber: number,
      public body: string,
      public photoURL: string,
      public linkText: string,
      public url: string
    ) {
    }
}
