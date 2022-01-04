import { memo, FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Heading, Flex } from 'boarder-components';
import dayjs from 'dayjs';
import first from 'lodash/first';

import { ICard } from 'common/types/cards';

import cx from './List.pcss';

interface IListProps {
  cards: ICard[];
}

const List: FC<IListProps> = (props) => {
  const { cards } = props;

  const navigate = useNavigate();

  const todayNewWordsCount = useMemo(() => {
    const startOfDay = Number(dayjs().startOf('day'));

    return cards.filter((card) => {
      const startLearnAt = first(card.reviews)?.date;

      return startLearnAt && startLearnAt >= startOfDay;
    }).length;
  }, [cards]);

  const handleAddCardClick = useCallback(() => {
    navigate('/cards/add');
  }, [navigate]);

  const handleLearnClick = useCallback(() => {
    navigate('/cards/learn');
  }, [navigate]);

  return (
    <Flex direction="column" between={2}>
      <Heading level={1}>Cards</Heading>

      <div>{`New words today: ${todayNewWordsCount}`}</div>

      <Flex direction="column" between={2}>
        {cards.length
          ? cards.map((card) => <div key={card.id}>{card.word}</div>)
          : 'There is no cards yet'}
      </Flex>

      <Flex className={cx.actions} direction="column" between={2}>
        <Button className={cx.addCardButton} onClick={handleAddCardClick}>
          Add card
        </Button>

        <Button className={cx.learnButton} onClick={handleLearnClick}>
          Learn
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(List);
