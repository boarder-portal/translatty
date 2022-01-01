import { ICard } from 'common/types/cards';

export interface IGetCardsRequestParams {}

export interface IGetCardsResponse {
  cards: ICard[];
}
