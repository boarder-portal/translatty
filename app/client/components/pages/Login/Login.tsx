import { memo, FC, useState, useCallback } from 'react';
import { Flex } from 'boarder-components';
import { useSetRecoilState } from 'recoil';
import { userAtom } from 'common/atoms/userAtom';
import { useNavigate } from 'react-router-dom';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import { Button, Container, Heading, Input } from 'boarder-components/dist';

import cx from './Login.pcss';

const Login: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const setUser = useSetRecoilState(userAtom);

  const navigate = useNavigate();

  const handleLogin = useCallback(async () => {
    if (!login || !password) {
      return;
    }

    const user = await httpClient.loginUser({ login, password });

    setUser(user);
    navigate('/');
  }, [login, navigate, password, setUser]);

  return (
    <Container className={cx.root}>
      <Flex direction="column" alignItems="center" between={2}>
        <Heading level={1}>Login</Heading>

        <Input value={login} placeholder="login" onInput={setLogin} />

        <Input
          value={password}
          type="password"
          placeholder="password"
          onInput={setPassword}
        />

        <Button onClick={handleLogin}>Login</Button>
      </Flex>
    </Container>
  );
};

export default memo(Login);
