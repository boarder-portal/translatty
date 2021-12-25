import { atom } from 'recoil';

import { IUser } from 'common/types/user';

export const userAtom = atom<IUser | null>({
  key: 'userAtom',
  default: null,
});
