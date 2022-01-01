export interface ICard {
  word: string;
  definition: string;
  reviewedTimes: number;
  lastReviewedAt: number | null;
  startLearnAt: number | null;
}
