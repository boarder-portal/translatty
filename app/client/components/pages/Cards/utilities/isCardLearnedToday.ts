import first from 'lodash/first';

import { ICard } from 'common/types/cards';

export default function isCardLearnedToday(
  card: ICard,
  startOfDay: number,
): boolean {
  const startLearnAt = first(card.reviews)?.date;

  return Boolean(startLearnAt && startLearnAt >= startOfDay);
}
