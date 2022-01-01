import { memo, FC } from 'react';
import { Container } from 'boarder-components';

import Menu from 'client/components/pages/Home/components/Menu/Menu';

const Home: FC = () => {
  return (
    <Container>
      <Menu />
    </Container>
  );
};

export default memo(Home);
