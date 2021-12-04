export interface ISubTime {
  start: number;
  end: number;
  duration: number;
}

export interface ISub {
  index: number;
  time: ISubTime;
  text: string;
}

export type TSubOriginal = string;
export type TSubTranslation = string;
export type TSubPair = [TSubOriginal, TSubTranslation];

export interface ISubPath {
  serial: string;
  season: string | number;
  episode: string | number;
}
