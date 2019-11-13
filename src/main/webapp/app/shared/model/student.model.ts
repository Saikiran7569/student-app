import { Moment } from 'moment';

export interface IStudent {
  id?: number;
  name?: string;
  address?: string;
  age?: number;
  rollNumber?: number;
  dateOfBirth?: Moment;
  designation?: string;
}

export class Student implements IStudent {
  constructor(
    public id?: number,
    public name?: string,
    public address?: string,
    public age?: number,
    public rollNumber?: number,
    public dateOfBirth?: Moment,
    public designation?: string
  ) {}
}
