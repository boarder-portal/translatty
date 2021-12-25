import { memo, FC } from 'react';

import Menu from 'client/components/pages/Home/components/Menu/Menu';
import { Container } from 'boarder-components/dist';

const Home: FC = () => {
  return (
    <Container>
      <Menu />
    </Container>
  );
};

export default memo(Home);
