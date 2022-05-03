import { useContext, useEffect } from 'react';

import fetchPosts from 'server/api/utilities/fetchPosts';
import httpClient from 'client/utilities/HttpClient/HttpClient';
import { PreloadDataListContext } from 'server/utilities/preloadDataListContext';
import { IStore } from 'common/utilities/store';

import useAtom from 'client/components/pages/Posts/hooks/useAtom';

export default function usePosts() {
  const [posts, setPosts] = useAtom('posts');
  const preloadDataList = useContext(PreloadDataListContext);

  if (SERVER) {
    preloadDataList?.push(async (store: IStore) => {
      store.value.posts = await fetchPosts();
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
