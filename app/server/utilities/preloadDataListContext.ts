import { createContext } from 'react';

import { IRecoilState } from 'common/types';

export interface IDataPreloader {
  (recoilState: IRecoilState): void;
}

export const PreloadDataListContext = createContext<IDataPreloader[] | null>(
  null,
);
