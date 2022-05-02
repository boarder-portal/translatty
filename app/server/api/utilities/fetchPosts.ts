import { IPost, POSTS } from 'common/constants/posts';

import delay from 'common/utilities/delay';

export default async function fetchPosts(): Promise<IPost[]> {
  console.log('fetch posts');

  await delay(3000);

  return POSTS;
}
