import {
  FC,
  FormEventHandler,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button, Container, Heading, Input } from 'boarder-components';

import { TSubPair } from 'server/types/subs';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import cx from './Subs.pcss';

const Subs: FC = () => {
  const [subPair, setSubPair] = useState<TSubPair | null>(null);
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

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    async (e) => {
      e.preventDefault();

      if (isOriginalDisplayed) {
        await requestSubPair();

        const input = document.querySelector('input');

        if (input) {
          input.focus();
        }
      } else {
        showOriginal();
      }
    },
    [isOriginalDisplayed, requestSubPair, showOriginal],
  );

  useEffect(() => {
    requestSubPair();
  }, [requestSubPair]);

  useEffect(() => {
    const listener = async (e: KeyboardEvent) => {
      if (e.key === 'Enter' && isOriginalDisplayed) {
        await requestSubPair();

        const input = document.querySelector('input');

        if (input) {
          input.focus();
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
        <form className={cx.content} onSubmit={handleSubmit}>
          <div>{subPair[1]}</div>

          {isOriginalDisplayed && (
            <div className={cx.original}>{subPair[0]}</div>
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

export default memo(Subs);
