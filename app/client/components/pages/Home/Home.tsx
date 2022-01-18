import { memo, FC } from 'react';
import { Container, Flex, Heading } from 'boarder-components';

const Home: FC = () => {
  return (
    <Container>
      <Flex direction="column" between={2}>
        <Heading level={1}>Hi! 👋</Heading>

        <div>Let's learn some english</div>
      </Flex>
    </Container>
  );
};

export default memo(Home);
