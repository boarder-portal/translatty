import { ICard } from 'common/types/cards';

import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';

export default function getCardLastReviewsDiff(card: ICard): number {
  return Math.max(
    card.reviews
      .slice(-TIME_TO_REVIEW_AGAIN + 1)
      .reduce((diff, c) => diff + (c.isCorrect ? 1 : -1), 0),
    0,
  );
}
