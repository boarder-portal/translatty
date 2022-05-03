import { MutableSnapshot } from 'recoil';
import { postsAtom } from 'common/atoms';

import { IRecoilState } from 'common/types';

export default function setAtomsByState(
  recoilState: IRecoilState,
): (mutableSnapshot: MutableSnapshot) => void {
  const { posts } = recoilState;

  return ({ set }: MutableSnapshot): void => {
    set(postsAtom, posts);
  };
}
