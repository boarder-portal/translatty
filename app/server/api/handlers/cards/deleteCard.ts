import { Request, Response } from 'express';

import { TDBCards } from 'server/types/db';
import {
  IDeleteCardRequestParams,
  IDeleteCardResponse,
} from 'common/types/requests/deleteCard';

import db from 'server/db/db';

export default async function deleteCard(
  req: Request<unknown, unknown, IDeleteCardRequestParams, unknown>,
  res: Response<IDeleteCardResponse>,
) {
  const login = req.session.login;

  if (!login) {
    return res.status(401).send();
  }

  const { id: cardId } = req.body;

  const allCards = await db.getCards();

  const userCards = allCards[login];

  const deleteCardIndex = userCards.findIndex((c) => c.id === cardId);

  if (deleteCardIndex === -1) {
    return res.status(400).send();
  }

  const updatedCardsByLogin: TDBCards = {
    ...allCards,
    [login]: [
      ...userCards.slice(0, deleteCardIndex),
      ...userCards.slice(deleteCardIndex + 1),
    ],
  };

  await db.writeCards(updatedCardsByLogin);

  res.send({});
}
