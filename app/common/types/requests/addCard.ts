import { ICard } from 'common/types/cards';

export interface IAddCardRequestParams
  extends Pick<ICard, 'word' | 'definition' | 'examples'> {}

export interface IAddCardResponse {
  cards: ICard[];
}
