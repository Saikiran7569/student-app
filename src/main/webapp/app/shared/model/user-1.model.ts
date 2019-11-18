export interface IUser1 {
  id?: number;
  name?: string;
}

export class User1 implements IUser1 {
  constructor(public id?: number, public name?: string) {}
}
