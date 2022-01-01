import { ICard } from 'common/types/cards';

export interface IReviewCardRequestParams {
  word: string;
}

export interface IReviewCardResponse {
  cards: ICard[];
}
