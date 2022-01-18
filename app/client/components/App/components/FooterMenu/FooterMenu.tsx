import { memo, FC } from 'react';
import { Flex } from 'boarder-components';
import { Link } from 'react-router-dom';

import CardsIcon from 'client/components/icons/CardsIcon';
import ProfileIcon from 'client/components/icons/ProfileIcon';

import cx from './FooterMenu.pcss';

interface IFooterMenuProps {}

const FooterMenu: FC<IFooterMenuProps> = () => {
  return (
    <Flex className={cx.root} alignItems="center">
      <Link to="/cards">
        <Flex direction="column" alignItems="center">
          <CardsIcon className={cx.icon} />

          <div className={cx.iconTitle}>Cards</div>
        </Flex>
      </Link>

      <Link to="/login">
        <Flex direction="column" alignItems="center">
          <ProfileIcon className={cx.icon} />

          <div className={cx.iconTitle}>Profile</div>
        </Flex>
      </Link>
    </Flex>
  );
};

export default memo(FooterMenu);
