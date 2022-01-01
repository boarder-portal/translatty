import { ICard } from 'common/types/cards';

export interface IAddCardRequestParams
  extends Pick<ICard, 'word' | 'definition'> {}

export interface IAddCardResponse {
  cards: ICard[];
}
