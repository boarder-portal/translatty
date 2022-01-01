import { ICard } from 'common/types/cards';

export interface IDBMeta {
  version: number;
}

export type TDBCards = Record<string, ICard[]>;
