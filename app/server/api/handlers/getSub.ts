import { Request, Response } from 'express';

import {
  IGetSubResponse,
  IGetSubSubRequestParams,
} from 'common/types/requests/getSub';

import getParsedSubs from 'server/utilities/subs/getParsedSubs';
import getSubPairs from 'server/utilities/subs/getSubPairs';

export default async function getSub(
  req: Request<unknown, unknown, unknown, IGetSubSubRequestParams>,
  res: Response,
) {
  const { en: enSubs, ru: ruSubs } = await getParsedSubs({
    name: 'howimetyourmother',
    season: 1,
    episode: 1,
  });

  const subPairs = getSubPairs(enSubs, ruSubs);

  const response: IGetSubResponse =
    subPairs[Math.floor(Math.random() * subPairs.length)];

  res.send(response);
}
