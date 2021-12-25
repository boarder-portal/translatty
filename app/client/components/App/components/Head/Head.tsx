import { memo, FC } from 'react';
import { Link } from 'react-router-dom';

import { Container, Heading } from 'boarder-components/dist';

import cx from './Head.pcss';

const Head: FC = () => {
  return (
    <Container className={cx.root}>
      <Link to="/">
        <Heading level={4}>English</Heading>
      </Link>
    </Container>
  );
};

export default memo(Head);
