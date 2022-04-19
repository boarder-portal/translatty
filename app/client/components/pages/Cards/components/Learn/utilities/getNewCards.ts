import { ICard } from 'common/types/cards';

export default function getNewCards(cards: ICard[]): ICard[] {
  return cards.filter((card) => card.reviews.length === 0);
}
