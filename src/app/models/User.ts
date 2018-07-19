import { Roles } from './Roles';

export class User {
    constructor(
      public $key: string,
      public uid: string,
      public email: string,
      public password: string,
      public isOnline: boolean,
      public loginDate: number = Date.now(),
      public photoURL: string,
      public title: string,
      public displayName: string,
      public roles: Roles,
    ) {
    }
}