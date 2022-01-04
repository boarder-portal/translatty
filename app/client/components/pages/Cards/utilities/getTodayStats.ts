import dayjs from 'dayjs';
import last from 'lodash/last';

import { ICard } from 'common/types/cards';

import isCardLearnedToday from 'client/components/pages/Cards/utilities/isCardLearnedToday';

export default function getTodayStats(cards: ICard[]): {
  new: ICard[];
  reviewed: ICard[];
} {
  const startOfDay = Number(dayjs().startOf('day'));

  const newCards: ICard[] = [];
  const reviewedCards: ICard[] = [];

  for (const card of cards) {
    const cardLearnedToday = isCardLearnedToday(card, startOfDay);

    if (cardLearnedToday) {
      newCards.push(card);

      continue;
    }

    const lastReview = last(card.reviews);

    if (!lastReview) {
      continue;
    }

    if (lastReview.date >= startOfDay) {
      reviewedCards.push(card);
    }
  }

  return {
    new: newCards,
    reviewed: reviewedCards,
  };
}
