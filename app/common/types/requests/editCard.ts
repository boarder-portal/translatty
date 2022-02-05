import { ICard } from 'common/types/cards';

export interface IEditCardRequestParams
  extends Pick<ICard, 'id' | 'word' | 'definition'> {}

export interface IEditCardResponse {
  card: ICard;
}
