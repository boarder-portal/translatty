import { IUser } from 'common/types/user';

export interface IDBUser extends IUser {
  password: string;
}
