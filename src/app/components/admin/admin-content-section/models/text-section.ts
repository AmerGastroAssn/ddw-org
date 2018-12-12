import { User } from '../../../../models/User';

export class TextSection {
    constructor(
      public author: User,
      public body: string,
      public createdAt: number,
      public id: string,
      public name: string,
      public updatedAt: number,
      public value: string,
    ) {
    }
}
