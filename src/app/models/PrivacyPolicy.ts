export class PrivacyPolicy {
    constructor(
      public author: string,
      public uid: string,
      public $key: string,
      public body: string,
      public updatedAt: string,
    ) {
    }
}
