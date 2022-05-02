import { memo, FC } from 'react';
import { Container, Flex, Heading } from 'boarder-components';
import { Link } from 'react-router-dom';

import usePosts from 'client/components/pages/Posts/hooks/usePosts';

interface IPostsProps {}

const Posts: FC<IPostsProps> = () => {
  const posts = usePosts();

  return (
    <Container>
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

      <Link to="/">Home</Link>
    </Container>
  );
};

export default memo(Posts);
