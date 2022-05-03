import { memo, FC, useCallback } from 'react';
import { Button, Container, Flex, Heading } from 'boarder-components';
import { Link } from 'react-router-dom';

import usePosts from 'client/components/pages/Posts/hooks/usePosts';
import useAtom from 'client/components/pages/Posts/hooks/useAtom';

interface IPostsProps {}

function Posts() {
  const posts = usePosts();

  return (
    <Flex direction="column">
      <Heading level={1}>Posts</Heading>

      <div>
        {posts.length ? (
          posts.map((post, index) => (
            <Flex key={index} direction="column" between={2}>
              <Heading level={3}>{post.title}</Heading>

              <div>{post.text}</div>
            </Flex>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </Flex>
  );
}

const PostsPage: FC<IPostsProps> = () => {
  const [, setPosts] = useAtom('posts');

  const changePosts = useCallback(() => {
    setPosts([
      {
        title: `Title ${Math.random()}`,
        text: 'Random text',
      },
    ]);
  }, [setPosts]);

  return (
    <Container>
      <Posts />
      <Posts />

      <Button onClick={changePosts}>Change posts</Button>
      <Link to="/">Home</Link>
    </Container>
  );
};

export default memo(PostsPage);
