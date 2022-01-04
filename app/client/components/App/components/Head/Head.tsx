import { memo, FC } from 'react';
import { Link } from 'react-router-dom';
import { Flex, Container, Heading } from 'boarder-components';
import { Routes, Route } from 'react-router-dom';

import UserActions from 'client/components/App/components/Head/components/UserActions/UserActions';

import cx from './Head.pcss';

const Head: FC = () => {
  return (
    <Container className={cx.root}>
      <Flex alignItems="center">
        <Routes>
          <Route
            path="/cards/*"
            element={
              <Link to="/cards">
                <Heading level={4}>Cards</Heading>
              </Link>
            }
          />

          <Route
            path="/*"
            element={
              <Link to="/">
                <Heading level={4}>English</Heading>
              </Link>
            }
          />
        </Routes>

        <UserActions className={cx.userActions} />
      </Flex>
    </Container>
  );
};

export default memo(Head);
