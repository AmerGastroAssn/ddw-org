export class Card {
    constructor(
      public $key: string,
      public uid: string,
      public title: string,
      public body: string,
      public photoURL: string,
      public buttonString: string,
      public url: string
    ) {
    }
}
