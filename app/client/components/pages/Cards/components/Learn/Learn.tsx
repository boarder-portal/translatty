import { memo, FC, useState, useCallback } from 'react';
import first from 'lodash/first';
import shuffle from 'lodash/shuffle';
import { Button, Flex, Heading, Input } from 'boarder-components';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';

interface ILearnProps {
  cards: ICard[];
  setCards(cards: ICard[]): void;
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;

const TIME_TO_REVIEW_AGAIN = [
  0,
  30 * MINUTE,
  2 * HOUR,
  DAY,
  3 * DAY,
  WEEK,
  2 * WEEK,
  MONTH,
  2 * MONTH,
];

function checkNeedToLearnCard(card: ICard): boolean {
  const timeLeftSinceLastReview = Date.now() - (card.lastReviewedAt || 0);

  return timeLeftSinceLastReview > TIME_TO_REVIEW_AGAIN[card.reviewedTimes];
}

function getInitialCardsToLearn(cards: ICard[]): ICard[] {
  return shuffle(cards.filter(checkNeedToLearnCard));
}

const Learn: FC<ILearnProps> = (props) => {
  const { cards, setCards } = props;

  const [cardsToLearn, setCardsToLearn] = useState(() =>
    getInitialCardsToLearn(cards),
  );
  const [suggestion, setSuggestion] = useState('');

  const currentCard = first(cardsToLearn) || null;

  const checkCard = useCallback(async () => {
    if (!currentCard) {
      return;
    }

    if (suggestion.toLowerCase() !== currentCard.word.toLowerCase()) {
      return;
    }

    const { cards: updatedCards } = await httpClient.reviewCard({
      word: currentCard.word,
    });

    setSuggestion('');
    setCardsToLearn(cardsToLearn.slice(1));
    setCards(updatedCards);
  }, [cardsToLearn, currentCard, setCards, suggestion]);

  if (!currentCard) {
    return <div>There are no cards to learn now</div>;
  }

  return (
    <Flex direction="column" between={2}>
      <div>{currentCard.definition}</div>
      <Input value={suggestion} disableAutoCorrect onInput={setSuggestion} />
      <Button onClick={checkCard}>Check</Button>
    </Flex>
  );
};

export default memo(Learn);
