import { Request, Response } from 'express';

import {
  IGetCardsRequestParams,
  IGetCardsResponse,
} from 'common/types/requests/getCards';

import db from 'server/db/db';

export default async function getCards(
  req: Request<unknown, unknown, unknown, IGetCardsRequestParams>,
  res: Response<IGetCardsResponse>,
) {
  const login = req.session.login;

  if (!login) {
    return res.status(401).send();
  }

  const allCards = await db.getCards();

  res.send({ cards: allCards[login] });
}
