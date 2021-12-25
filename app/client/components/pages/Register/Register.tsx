import { memo, FC, useState, useCallback } from 'react';
import { Flex } from 'boarder-components';

import HttpClient from 'client/utilities/HttpClient/HttpClient';

import { Button, Container, Heading, Input } from 'boarder-components/dist';

import cx from './Register.pcss';

const Register: FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = useCallback(async () => {
    if (!login || !password) {
      return;
    }

    await HttpClient.registerUser({ login, password });
  }, [password, login]);

  return (
    <Container className={cx.root}>
      <Flex direction="column" alignItems="center" between={2}>
        <Heading level={1}>Registration</Heading>

        <Input value={login} onInput={setLogin} placeholder="login" />

        <Input
          value={password}
          type="password"
          onInput={setPassword}
          placeholder="password"
        />

        <Button onClick={handleRegister}>Register</Button>
      </Flex>
    </Container>
  );
};

export default memo(Register);
