import dayjs from 'dayjs';
import last from 'lodash/last';
import shuffle from 'lodash/shuffle';

import { ICard } from 'common/types/cards';

import isCardLearnedToday from 'client/components/pages/Cards/utilities/isCardLearnedToday';
import getCardLastReviewsDiff from 'client/components/pages/Cards/utilities/getCardLastReviewsDiff';

import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';

export default function getInitialCardsToLearn(cards: ICard[]): ICard[] {
  const cardsToLearn: ICard[] = [];
  const startOfDay = Number(dayjs().startOf('day'));

  const todayCardsLearnedCount = cards.filter((card) =>
    isCardLearnedToday(card, startOfDay),
  ).length;

  let cardsLeftToLearnCount = Math.max(10 - todayCardsLearnedCount, 0);

  for (const card of cards) {
    const lastReview = last(card.reviews);

    if (!lastReview) {
      if (cardsLeftToLearnCount > 0) {
        cardsLeftToLearnCount--;

        cardsToLearn.push(card);
      }

      continue;
    }

    if (!lastReview.isCorrect) {
      cardsToLearn.push(card);

      continue;
    }

    const timeLeftSinceLastReview = Date.now() - (lastReview.date || 0);
    const reviewsDiff = Math.max(getCardLastReviewsDiff(card), 1);

    if (timeLeftSinceLastReview > TIME_TO_REVIEW_AGAIN[reviewsDiff]) {
      cardsToLearn.push(card);
    }
  }

  return shuffle(cardsToLearn);
}
