import { ICard } from 'common/types/cards';

export interface IReviewCardRequestParams {
  id: string;
  isCorrect: boolean;
}

export interface IReviewCardResponse {
  cards: ICard[];
}
