import { Request, Response } from 'express';
import uuid from 'uuid/v4';

import {
  IAddCardRequestParams,
  IAddCardResponse,
} from 'common/types/requests/addCard';
import { TDBCards } from 'server/types/db';

import db from 'server/db/db';

export default async function addCard(
  req: Request<unknown, unknown, IAddCardRequestParams, unknown>,
  res: Response<IAddCardResponse>,
) {
  const login = req.session.login;

  if (!login) {
    return res.status(401).send();
  }

  const newCardParams = req.body;

  const cardsByLogin = await db.getCards();

  const updatedCardsByLogin: TDBCards = {
    ...cardsByLogin,
    [login]: [
      ...cardsByLogin[login],
      {
        ...newCardParams,
        id: uuid(),
        reviews: [],
      },
    ],
  };

  await db.writeCards(updatedCardsByLogin);

  res.send({
    cards: updatedCardsByLogin[login],
  });
}
