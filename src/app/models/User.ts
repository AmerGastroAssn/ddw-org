export class User {
    constructor(
      public uid: string,
      public displayName: string,
      public email: string,
      public password: string,
      public about: string,
      public isOnline: boolean,
      public loginDate: number = Date.now(),
      public photoURL: string
    ) {
    }
}
