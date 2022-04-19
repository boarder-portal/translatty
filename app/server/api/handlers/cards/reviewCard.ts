import { Request, Response } from 'express';

import {
  IReviewCardRequestParams,
  IReviewCardResponse,
} from 'common/types/requests/reviewCard';

import db from 'server/db/db';

export default async function reviewCard(
  req: Request<unknown, unknown, IReviewCardRequestParams, unknown>,
  res: Response<IReviewCardResponse>,
) {
  const login = req.session.login;

  if (!login) {
    return res.status(401).send();
  }

  const { id, isCorrect } = req.body;

  const allCards = await db.getCards();
  const userCards = allCards[login];
  const cardToReview = userCards.find((card) => card.id === id);

  if (!cardToReview) {
    return res.status(400);
  }

  cardToReview.reviews.push({
    date: Date.now(),
    isCorrect,
  });

  await db.writeCards(allCards);

  return res.send({ card: cardToReview });
}
