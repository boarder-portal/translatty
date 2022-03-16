import { memo, FC, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Flex } from 'boarder-components';

import { ICard } from 'common/types/cards';

import getTodayStats from 'client/components/pages/Cards/utilities/getTodayStats';

import cx from './List.pcss';

interface IListProps {
  cards: ICard[];
}

const List: FC<IListProps> = (props) => {
  const { cards } = props;

  const navigate = useNavigate();

  const todayStats = useMemo(() => getTodayStats(cards), [cards]);

  const handleAddCardClick = useCallback(() => {
    navigate('/cards/add');
  }, [navigate]);

  const handleLearnClick = useCallback(() => {
    navigate('/cards/learn');
  }, [navigate]);

  const handleQuizClick = useCallback(() => {
    navigate('/cards/quiz');
  }, [navigate]);

  return (
    <Flex className={cx.root} direction="column" between={2}>
      <div>{`New today: ${todayStats.new.length} / 10`}</div>
      <div>{`Reviewed today: ${todayStats.reviewed.length}`}</div>

      <Link to="/cards/popularWords">Popular words</Link>

      <Flex direction="column" between={2}>
        {cards.length
          ? cards.map((card) => (
              <Link key={card.id} to={`/cards/card/${card.id}`}>
                {card.word}
              </Link>
            ))
          : 'There are no cards yet'}
      </Flex>

      <Flex className={cx.actions} direction="column" between={2}>
        <Button className={cx.addCardButton} onClick={handleAddCardClick}>
          Add card
        </Button>

        <Button className={cx.learnButton} onClick={handleLearnClick}>
          Learn
        </Button>

        <Button className={cx.quizButton} onClick={handleQuizClick}>
          Quiz
        </Button>
      </Flex>
    </Flex>
  );
};

export default memo(List);
