import { memo, FC, useMemo, useState, useCallback } from 'react';
import { Flex, Heading } from 'boarder-components';
import shuffle from 'lodash/shuffle';
import last from 'lodash/last';

import { ICard } from 'common/types/cards';

import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';
import CardProgress from 'client/components/pages/Cards/components/CardProgress/CardProgress';

interface IQuizProps {
  cards: ICard[];
}

enum ESort {
  LESS_KNOWN = 'LESS_KNOWN',
  LAST_REVIEW_DATE = 'LAST_REVIEW_DATE',
}

function getCardLastFailedReviewsCount(card: ICard): number {
  return card.reviews
    .slice(-(TIME_TO_REVIEW_AGAIN.length - 1))
    .filter((card) => !card.isCorrect).length;
}

function getCardLastReviewDate(card: ICard): number {
  return last(card.reviews)?.date || Infinity;
}

const Quiz: FC<IQuizProps> = (props) => {
  const { cards } = props;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [sortMode, setSortMode] = useState<ESort>(ESort.LESS_KNOWN);

  const sortFunction = useMemo(
    () =>
      sortMode === ESort.LESS_KNOWN
        ? getCardLastFailedReviewsCount
        : getCardLastReviewDate,
    [sortMode],
  );

  const sortDirection = useMemo(
    () => (sortMode === ESort.LESS_KNOWN ? 1 : -1),
    [sortMode],
  );

  const sortedCards = useMemo(() => {
    return [...cards].sort(
      (cardA, cardB) =>
        (sortFunction(cardB) - sortFunction(cardA)) * sortDirection,
    );
  }, [cards, sortDirection, sortFunction]);

  const currentCard = useMemo(() => {
    return sortedCards[currentCardIndex];
  }, [currentCardIndex, sortedCards]);

  const answers = useMemo(() => {
    const shuffledCardsWithoutCurrent = shuffle([
      ...sortedCards.slice(0, currentCardIndex),
      ...sortedCards.slice(currentCardIndex),
    ]);

    return shuffle([
      currentCard.definition,
      shuffledCardsWithoutCurrent[0].definition,
      shuffledCardsWithoutCurrent[1].definition,
    ]);
  }, [currentCard.definition, currentCardIndex, sortedCards]);

  const handleAnswerClick = useCallback(
    (index) => {
      if (answers[index] !== currentCard.definition) {
        return;
      }

      setCurrentCardIndex((i) => i + 1);
    },
    [answers, currentCard.definition],
  );

  const changeSortMode = useCallback(() => {
    setSortMode((prevSortMode) =>
      prevSortMode === ESort.LESS_KNOWN
        ? ESort.LAST_REVIEW_DATE
        : ESort.LESS_KNOWN,
    );
    setCurrentCardIndex(0);
  }, []);

  if (!currentCard) {
    return <div>All cards learned!</div>;
  }

  return (
    <Flex direction="column" between={2}>
      <Flex justifyContent="spaceBetween" alignItems="center">
        <Heading level={1}>{currentCard.word}</Heading>

        <div onClick={changeSortMode}>
          {sortMode === ESort.LESS_KNOWN ? 'Less known' : 'Last review date'}
        </div>
      </Flex>

      <CardProgress reviews={currentCard.reviews} />

      {answers.map((answer, index) => {
        return (
          <div key={index} onClick={() => handleAnswerClick(index)}>
            {answer}
          </div>
        );
      })}
    </Flex>
  );
};

export default memo(Quiz);
