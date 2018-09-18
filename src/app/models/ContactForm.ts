export class ContactForm {
    constructor(
      public $key: string,
      public firstName: string,
      public lastName: string,
      public email: string,
      public phoneNumber: string,
      public subject: string,
      public body: string,
      public programType: string,
      public sentDate: number,
      public uid: string,
    ) {
    }
}
