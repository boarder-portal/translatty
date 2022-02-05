import { Request, Response } from 'express';

import { TDBCards } from 'server/types/db';
import {
  IEditCardRequestParams,
  IEditCardResponse,
} from 'common/types/requests/editCard';

import db from 'server/db/db';

export default async function editCard(
  req: Request<unknown, unknown, IEditCardRequestParams, unknown>,
  res: Response<IEditCardResponse>,
) {
  const login = req.session.login;

  if (!login) {
    return res.status(401).send();
  }

  const { id: cardId, ...editParams } = req.body;

  const allCards = await db.getCards();

  const userCards = allCards[login];

  const editCardIndex = userCards.findIndex((c) => c.id === cardId);

  if (editCardIndex === -1) {
    return res.status(400).send();
  }

  const updatedCard = {
    ...userCards[editCardIndex],
    ...editParams,
  };

  const updatedCardsByLogin: TDBCards = {
    ...allCards,
    [login]: [
      ...userCards.slice(0, editCardIndex),
      updatedCard,
      ...userCards.slice(editCardIndex + 1),
    ],
  };

  await db.writeCards(updatedCardsByLogin);

  res.send({
    card: updatedCard,
  });
}
