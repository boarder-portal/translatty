import { memo, FC } from 'react';
import { Container, Flex, Heading } from 'boarder-components';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <Container>
      <Flex direction="column" between={2}>
        <Heading level={1}>Home</Heading>

        <Flex between={2}>
          <Link to="/posts">Posts</Link>
        </Flex>
      </Flex>
    </Container>
  );
};

export default memo(Home);
