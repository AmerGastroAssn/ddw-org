export class User {
    constructor(
      public email: string,
      public password: string,
      public isOnline: boolean,
      public loginDate: number = Date.now(),
      public photoURL: string,
      public admin: boolean,
      public title: string,
      public displayName: string,
      public uid?: string,
    ) {
    }
}
