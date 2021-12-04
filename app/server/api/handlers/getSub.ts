import { Request, Response } from 'express';

import {
  IGetSubResponse,
  IGetSubSubRequestParams,
} from 'common/types/requests/getSub';

import db from 'server/db/db';

export default async function getSub(
  req: Request<unknown, unknown, unknown, IGetSubSubRequestParams>,
  res: Response,
) {
  const subsKey = db.getSubKey({
    serial: 'howimetyourmother',
    season: 1,
    episode: 1,
  });

  const subPairs = (await db.getParsedSubs())[subsKey];

  if (!subPairs) {
    throw new Error('No such subs in db');
  }

  const response: IGetSubResponse =
    subPairs[Math.floor(Math.random() * subPairs.length)];

  res.send(response);
}
