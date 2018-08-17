export class Settings {
    constructor(
      public $key: string,
      public disableAdmin: boolean,
      public allowSettings: boolean,
      public allowSignup: boolean,
      public uid: string
    ) {
    }
}
