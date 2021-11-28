import './Home.scss';
import { h, FunctionalComponent } from 'preact';
import { memo } from 'preact/compat';
import block from 'bem-cn';
import { useCallback } from 'preact/hooks';
import { useHistory } from 'react-router-dom';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import Container from 'client/components/common/Container/Container';
import Button from 'client/components/common/Button/Button';
import Heading from 'client/components/common/Heading/Heading';

const b = block('Home');

const Home: FunctionalComponent = () => {
  const history = useHistory();

  return (
    <Container>
      <Heading level={1}>🇭🇲 Translatty</Heading>
    </Container>
  );
};

export default memo(Home);
