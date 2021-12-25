import { memo, FC } from 'react';
import { Flex } from 'boarder-components';
import { Link } from 'react-router-dom';

const Menu: FC = () => {
  return (
    <Flex between={2} direction="column">
      <Link to="/subs">Translate subs</Link>
      <Link to="/cards">Learn words</Link>
    </Flex>
  );
};

export default memo(Menu);
