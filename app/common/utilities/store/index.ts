import { IPost } from 'common/constants/posts';
import { createContext } from 'react';

export interface IState {
  posts: IPost[];
}

export interface IAtomListener {
  (value: any): void;
}

type TListeners = Record<keyof IState, IAtomListener[]>;

export interface IStore {
  value: IState;
  listeners: TListeners;
}

export function getInitialState(): IState {
  return {
    posts: [],
  };
}

export const StoreContext = createContext<IStore>({} as IStore);

export default function createStore(initialState: IState): IStore {
  return {
    value: initialState,
    listeners: Object.keys(initialState).reduce<TListeners>(
      (listeners, key) => {
        return {
          ...listeners,
          [key]: [],
        };
      },
      {} as TListeners,
    ),
  };
}
