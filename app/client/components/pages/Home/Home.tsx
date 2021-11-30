import { h, FunctionalComponent } from 'preact';
import { memo, useCallback, useEffect, useRef, useState } from 'preact/compat';

import { ISubPair } from 'server/types/subs';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import { Button, Container, Heading, Input } from 'boarder-components/dist/';

import cx from './Home.pcss';

const Home: FunctionalComponent = () => {
  const [subPair, setSubPair] = useState<ISubPair | null>(null);
  const [userGuess, setUserGuess] = useState('');
  const [isOriginalDisplayed, setIsOriginalDisplayed] = useState(false);

  const requestSubPair = useCallback(async () => {
    setIsOriginalDisplayed(false);
    setUserGuess('');

    const requestedSubPair = await httpClient.getSub();

    setSubPair(requestedSubPair);
  }, []);

  const showOriginal = useCallback(() => {
    setIsOriginalDisplayed(true);
  }, []);

  useEffect(() => {
    requestSubPair();
  }, [requestSubPair]);

  useEffect(() => {
    const listener = async (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        if (isOriginalDisplayed) {
          await requestSubPair();

          const input = document.querySelector('input');

          if (input) {
            input.focus();
          }
        } else {
          showOriginal();
        }
      }
    };

    document.addEventListener('keypress', listener);

    return () => {
      document.removeEventListener('keypress', listener);
    };
  }, [isOriginalDisplayed, requestSubPair, showOriginal]);

  return (
    <Container>
      <Heading level={1}>🇭🇲 Translatty</Heading>

      {subPair && (
        <form className={cx.content}>
          <div>{subPair.translation}</div>

          {isOriginalDisplayed && (
            <div className={cx.original}>{subPair.original}</div>
          )}

          {!isOriginalDisplayed && (
            <Input
              className={cx.guessInput}
              value={userGuess}
              onInput={setUserGuess}
            />
          )}

          {isOriginalDisplayed && <div className={cx.guess}>{userGuess}</div>}

          {!isOriginalDisplayed && (
            <Button className={cx.button}>Проверить</Button>
          )}

          {isOriginalDisplayed && <Button className={cx.button}>Дальше</Button>}
        </form>
      )}
    </Container>
  );
};

export default memo(Home);
