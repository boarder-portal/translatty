import { Request, Response } from 'express';

import {
  IRegisterUserRequestParams,
  IRegisterUserResponse,
} from 'common/types/requests/registerUser';
import { IDBUser } from 'server/types/user';

import { hashPassword } from 'server/db/utilities/hashPassword';

import db from 'server/db/db';

export default async function register(
  req: Request<unknown, unknown, IRegisterUserRequestParams, unknown>,
  res: Response<IRegisterUserResponse>,
) {
  const newUserParams = req.body;

  const users = await db.getUsers();

  const existedUser =
    users.find((user) => user.login === newUserParams.login) || null;

  if (existedUser) {
    return res.status(400).send('User already exists');
  }

  const newUser: IDBUser = {
    login: newUserParams.login,
    password: await hashPassword(newUserParams.password),
  };

  await db.writeUsers([...users, newUser]);

  res.send({});
}
