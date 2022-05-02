import { useContext, useEffect } from 'react';
import { postsAtom } from 'common/atoms';
import { useRecoilState } from 'recoil';

import { IRecoilState } from 'common/types';

import fetchPosts from 'server/api/utilities/fetchPosts';
import httpClient from 'client/utilities/HttpClient/HttpClient';
import { PreloadDataListContext } from 'server/utilities/preloadDataListContext';

export default function usePosts() {
  const [posts, setPosts] = useRecoilState(postsAtom);
  const preloadDataList = useContext(PreloadDataListContext);

  if (SERVER) {
    preloadDataList?.push(async (recoilState: IRecoilState) => {
      recoilState.posts = await fetchPosts();
    });
  }

  useEffect(() => {
    (async () => {
      if (posts.length) {
        return;
      }

      setPosts(await httpClient.getPosts());
    })();
  }, [posts.length, setPosts]);

  return posts;
}
