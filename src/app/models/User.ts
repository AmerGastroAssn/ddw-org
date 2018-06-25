export class User {
    constructor(
      public uid: string,
      public email: string,
      public password: string,
      public isOnline: boolean,
      public loginDate: number = Date.now(),
      public photoURL: string,
      public displayName?: string,
      public about?: string,
    ) {
    }
}
