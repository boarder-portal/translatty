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

export interface ISubPair {
  original: string;
  translation: string;
}
