import { memo, FC, useMemo, useState, useCallback } from 'react';
import { Flex, Heading } from 'boarder-components';
import shuffle from 'lodash/shuffle';

import { ICard } from 'common/types/cards';

import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';

interface IQuizProps {
  cards: ICard[];
}

function getCardLastFailedReviewsCount(card: ICard) {
  return card.reviews
    .slice(-(TIME_TO_REVIEW_AGAIN.length - 1))
    .filter((card) => !card.isCorrect).length;
}

const Quiz: FC<IQuizProps> = (props) => {
  const { cards } = props;

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const lessKnownCards = useMemo(() => {
    return [...cards].sort(
      (cardA, cardB) =>
        getCardLastFailedReviewsCount(cardB) -
        getCardLastFailedReviewsCount(cardA),
    );
  }, [cards]);

  const currentCard = useMemo(() => {
    return lessKnownCards[currentCardIndex];
  }, [currentCardIndex, lessKnownCards]);

  const answers = useMemo(() => {
    const shuffledCardsWithoutCurrent = shuffle([
      ...lessKnownCards.slice(0, currentCardIndex),
      ...lessKnownCards.slice(currentCardIndex),
    ]);

    return shuffle([
      currentCard.definition,
      shuffledCardsWithoutCurrent[0].definition,
      shuffledCardsWithoutCurrent[1].definition,
    ]);
  }, [currentCard.definition, currentCardIndex, lessKnownCards]);

  const handleAnswerClick = useCallback(
    (index) => {
      if (answers[index] !== currentCard.definition) {
        return;
      }

      setCurrentCardIndex((i) => i + 1);
    },
    [answers, currentCard.definition],
  );

  if (!currentCard) {
    return <div>All cards learned!</div>;
  }

  return (
    <Flex direction="column" between={2}>
      <Heading level={1}>{currentCard.word}</Heading>

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
