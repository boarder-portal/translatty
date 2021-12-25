import { IDBUser } from 'server/types/user';
import { IUser } from 'common/types/user';

export interface ILoginUserRequestParams extends IDBUser {}

export interface ILoginUserResponse extends IUser {}
