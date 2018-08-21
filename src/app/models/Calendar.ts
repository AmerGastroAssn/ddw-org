export class Calendar {
    constructor(
      public $key: string,
      public body: string,
      public date: number,
      public column: string,
      public endTime: number,
      public startTime: number,
      public title: string,
      public uid: string,
    ) {
    }
}
