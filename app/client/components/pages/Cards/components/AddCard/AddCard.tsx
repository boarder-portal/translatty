import { memo, FC, useState, useCallback } from 'react';
import { Button, Heading, Input, Flex } from 'boarder-components';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';

interface IAddCardProps {
  setCards(cards: ICard[]): void;
}

const AddCard: FC<IAddCardProps> = (props) => {
  const { setCards } = props;

  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  const addCard = useCallback(async () => {
    if (!word || !definition) {
      return;
    }

    const { cards: updatedCards } = await httpClient.addCard({
      word,
      definition,
    });

    setWord('');
    setDefinition('');

    setCards(updatedCards);
  }, [definition, setCards, word]);

  return (
    <Flex direction="column" between={2}>
      <Heading level={1}>Add card</Heading>

      <Input value={word} placeholder="word" onInput={setWord} />

      <Input
        value={definition}
        placeholder="definition"
        onInput={setDefinition}
      />

      <Button onClick={addCard}>Add word</Button>
    </Flex>
  );
};

export default memo(AddCard);
