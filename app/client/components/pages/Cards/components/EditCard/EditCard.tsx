import { memo, FC, useState, useCallback, useMemo } from 'react';
import { Button, Flex, Heading, Input } from 'boarder-components';
import { useNavigate, useParams } from 'react-router-dom';
import { update } from 'lodash';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';

interface IEditCardProps {
  cards: ICard[];
  setCards(cards: ICard[]): void;
}

const EditCard: FC<IEditCardProps> = (props) => {
  const { cards, setCards } = props;

  const { id } = useParams();
  const navigate = useNavigate();

  const card = useMemo(() => cards.find((c) => c.id === id), [cards, id]);

  const [word, setWord] = useState(card?.word || '');
  const [definition, setDefinition] = useState(card?.definition || '');

  const editCard = useCallback(async () => {
    if (!card) {
      return;
    }

    const { card: updatedCard } = await httpClient.editCard({
      id: card.id,
      word,
      definition,
    });

    const cardIndex = cards.findIndex((c) => c.id === updatedCard.id);

    if (cardIndex === -1) {
      return;
    }

    setCards([
      ...cards.slice(0, cardIndex),
      updatedCard,
      ...cards.slice(cardIndex + 1),
    ]);

    navigate(`/cards/card/${updatedCard.id}`);
  }, [card, cards, definition, navigate, setCards, word]);

  return (
    <Flex direction="column" between={2}>
      <Heading level={1}>Edit card</Heading>

      <Input value={word} placeholder="word" onInput={setWord} />

      <Input
        value={definition}
        placeholder="definition"
        onInput={setDefinition}
      />

      <Button onClick={editCard}>Edit</Button>
    </Flex>
  );
};

export default memo(EditCard);
