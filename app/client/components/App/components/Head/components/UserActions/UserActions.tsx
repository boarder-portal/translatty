import { memo, FC } from 'react';
import { Flex } from 'boarder-components';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from 'common/atoms/userAtom';

interface IUserActionsProps {
  className?: string;
}

const UserActions: FC<IUserActionsProps> = (props) => {
  const { className } = props;

  const user = useRecoilValue(userAtom);

  if (user) {
    return <div className={className}>{user.login}</div>;
  }

  return (
    <Flex className={className} between={2}>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Flex>
  );
};

export default memo(UserActions);
