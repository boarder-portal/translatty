import { Request } from 'express';
import omit from 'lodash/omit';

import { IUser } from 'common/types/user';

import db from 'server/db/db';

export interface IPageData {
  user: IUser | null;
}

async function getUser(req: Request): Promise<IUser | null> {
  const { login } = req.session;

  if (!login) {
    return null;
  }

  const users = await db.getUsers();

  const user = users.find((u) => u.login === login);

  if (!user) {
    return null;
  }

  return omit(user, ['password']);
}

export default async function getPageData(req: Request): Promise<IPageData> {
  return {
    user: await getUser(req),
  };
}
