import { ICard } from 'common/types/cards';

export interface IDeleteCardRequestParams extends Pick<ICard, 'id'> {}

export interface IDeleteCardResponse {}
