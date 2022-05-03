import { createContext } from 'react';

import { IStore } from 'common/utilities/store';

export interface IDataPreloader {
  (store: IStore): void;
}

export const PreloadDataListContext = createContext<IDataPreloader[] | null>(
  null,
);
