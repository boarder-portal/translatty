export interface ICardReview {
  isCorrect: boolean;
  date: number;
}

export interface ICard {
  id: string;
  word: string;
  definition: string;
  reviews: ICardReview[];
}
