import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex } from 'boarder-components';

import { Container, Heading } from 'boarder-components/dist';
import UserActions from 'client/components/App/components/Head/components/UserActions/UserActions';

import cx from './Head.pcss';

const Head: FC = () => {
  return (
    <Container className={cx.root}>
      <Flex alignItems="center">
        <Link to="/">
          <Heading level={4}>English</Heading>
        </Link>

        <UserActions className={cx.userActions} />
      </Flex>
    </Container>
  );
};

export default memo(Head);
