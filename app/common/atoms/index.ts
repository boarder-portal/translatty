import { atom } from 'recoil';
import { IPost } from 'common/constants/posts';

export const postsAtom = atom<IPost[]>({
  key: 'posts',
  default: [],
});
