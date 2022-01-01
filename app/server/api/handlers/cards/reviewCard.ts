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

  const { word } = req.body;

  const allCards = await db.getCards();
  const userCards = allCards[login];
  const wordToReview = userCards.find((card) => card.word === word);

  if (!wordToReview) {
    return res.status(400);
  }

  wordToReview.reviewedTimes++;
  wordToReview.lastReviewedAt = Date.now();

  if (wordToReview.reviewedTimes === 1 && !wordToReview.startLearnAt) {
    wordToReview.startLearnAt = Date.now();
  }

  await db.writeCards(allCards);

  return res.send({ cards: userCards });
}
