import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';

import { Container, Heading } from 'boarder-components/dist/';

const Home: FunctionalComponent = () => {
  return (
    <Container>
      <Heading level={1}>🇭🇲 Translatty</Heading>
    </Container>
  );
};

export default memo(Home);
