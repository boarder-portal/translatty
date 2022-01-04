import { memo, FC, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex } from 'boarder-components';
import dayjs from 'dayjs';
import first from 'lodash/first';
import last from 'lodash/last';

import { ICard } from 'common/types/cards';

import cx from './List.pcss';

interface IListProps {
  cards: ICard[];
}

const List: FC<IListProps> = (props) => {
  const { cards } = props;

  const navigate = useNavigate();

  const todayStats = useMemo(() => {
    const startOfDay = Number(dayjs().startOf('day'));

    const newCards: ICard[] = [];
    const reviewedCards: ICard[] = [];

    for (const card of cards) {
      const startLearnAt = first(card.reviews)?.date;

      if (startLearnAt && startLearnAt >= startOfDay) {
        newCards.push(card);

        continue;
      }

      const lastReview = last(card.reviews);

      if (!lastReview) {
        continue;
      }

      if (lastReview.date >= startOfDay) {
        reviewedCards.push(card);
      }
    }

    return {
      new: newCards,
      reviewed: reviewedCards,
    };
  }, [cards]);

  const handleAddCardClick = useCallback(() => {
    navigate('/cards/add');
  }, [navigate]);

  const handleLearnClick = useCallback(() => {
    navigate('/cards/learn');
  }, [navigate]);

  return (
    <Flex className={cx.root} direction="column" between={2}>
      <div>{`New today: ${todayStats.new.length} / 10`}</div>
      <div>{`Reviewed today: ${todayStats.reviewed.length}`}</div>

      <Flex direction="column" between={2}>
        {cards.length
          ? cards.map((card) => <div key={card.id}>{card.word}</div>)
          : 'There are no cards yet'}
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
