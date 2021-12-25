import { Request, Response } from 'express';
import omit from 'lodash/omit';

import {
  ILoginUserRequestParams,
  ILoginUserResponse,
} from 'common/types/requests/loginUser';

import { isValidPassword } from 'server/db/utilities/isValidPassword';

import db from 'server/db/db';

export default async function login(
  req: Request<unknown, unknown, ILoginUserRequestParams, unknown>,
  res: Response<ILoginUserResponse>,
) {
  const userParams = req.body;

  const users = await db.getUsers();

  const dbUser = users.find((user) => user.login === userParams.login) || null;

  if (!dbUser) {
    return res.status(404).send();
  }

  if (!(await isValidPassword(userParams.password, dbUser.password))) {
    return res.status(403).send();
  }

  req.session.login = userParams.login;

  res.send(omit(dbUser, ['password']));
}
