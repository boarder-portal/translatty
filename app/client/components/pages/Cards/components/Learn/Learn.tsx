import { memo, FC, useState, useCallback, useRef, useMemo } from 'react';
import first from 'lodash/first';
import shuffle from 'lodash/shuffle';
import { Button, Flex, Input } from 'boarder-components';
import last from 'lodash/last';
import dayjs from 'dayjs';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';
import isCardLearnedToday from 'client/components/pages/Cards/utilities/isCardLearnedToday';

import CardProgress from 'client/components/pages/Cards/components/Learn/components/CardProgress/CardProgress';

import cx from './Learn.pcss';

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

function getInitialCardsToLearn(cards: ICard[]): ICard[] {
  const cardsToLearn: ICard[] = [];

  const startOfDay = Number(dayjs().startOf('day'));

  const todayCardsLearnedCount = cards.filter((card) =>
    isCardLearnedToday(card, startOfDay),
  ).length;

  let cardsLeftToLearnCount = Math.max(10 - todayCardsLearnedCount, 0);

  for (const card of cards) {
    const lastReview = last(card.reviews);

    if (!lastReview) {
      if (cardsLeftToLearnCount > 0) {
        cardsLeftToLearnCount--;

        cardsToLearn.push(card);
      }

      continue;
    }

    if (!lastReview.isCorrect) {
      cardsToLearn.push(card);

      continue;
    }

    const timeLeftSinceLastReview = Date.now() - (lastReview.date || 0);

    const correctReviewsCount = card.reviews
      .slice(-TIME_TO_REVIEW_AGAIN + 1)
      .filter((card) => card.isCorrect).length;

    if (timeLeftSinceLastReview > TIME_TO_REVIEW_AGAIN[correctReviewsCount]) {
      cardsToLearn.push(card);
    }
  }

  return shuffle(cardsToLearn);
}

const Learn: FC<ILearnProps> = (props) => {
  const { cards, setCards } = props;

  const [cardsToLearn, setCardsToLearn] = useState(() =>
    getInitialCardsToLearn(cards),
  );
  const [suggestion, setSuggestion] = useState('');
  const [nextCardButtonVisible, setNextCardButtonVisible] = useState(false);
  const suggestionInputRef = useRef<HTMLInputElement | null>(null);

  const currentCard = first(cardsToLearn) || null;

  const updateCurrentAndAllCards = useCallback(
    async (currentCardId: string, isCorrect: boolean) => {
      if (!isCorrect) {
        const lastReview = last(currentCard?.reviews);

        if (!lastReview) {
          return;
        }

        if (!lastReview.isCorrect) {
          const timeSinceLastReview = Date.now() - lastReview.date;

          if (timeSinceLastReview < 10 * MINUTE) {
            return;
          }
        }
      }

      const { cards: updatedCards } = await httpClient.reviewCard({
        id: currentCardId,
        isCorrect,
      });

      const updatedCard = updatedCards.find(
        (card) => card.id === currentCardId,
      );

      if (!updatedCard) {
        throw new Error('There are not updated card');
      }

      setCardsToLearn((cards) => [updatedCard, ...cards.slice(1)]);
      setCards(updatedCards);
    },
    [currentCard?.reviews, setCards],
  );

  const handleCheckCard = useCallback(async () => {
    if (!currentCard || !suggestion) {
      return;
    }

    const isCorrect =
      suggestion.toLowerCase() === currentCard.word.toLowerCase();

    if (isCorrect) {
      setNextCardButtonVisible(true);
    }

    await updateCurrentAndAllCards(currentCard.id, isCorrect);
  }, [currentCard, suggestion, updateCurrentAndAllCards]);

  const handleRememberCard = useCallback(async () => {
    if (!currentCard) {
      return;
    }

    setNextCardButtonVisible(true);

    await updateCurrentAndAllCards(currentCard.id, true);
  }, [currentCard, updateCurrentAndAllCards]);

  const handleForgetCard = useCallback(async () => {
    if (!currentCard) {
      return;
    }

    setNextCardButtonVisible(true);

    await updateCurrentAndAllCards(currentCard.id, false);

    setCardsToLearn((cards) => [...cards, cards[0]]);
  }, [currentCard, updateCurrentAndAllCards]);

  const handleNextClick = useCallback(() => {
    setNextCardButtonVisible(false);
    setCardsToLearn((cards) => cards.slice(1));
    setSuggestion('');
  }, []);

  const actions = useMemo(() => {
    if (nextCardButtonVisible) {
      return <Button onClick={handleNextClick}>Next</Button>;
    }

    return (
      <>
        <Button onClick={handleCheckCard}>Check</Button>

        <Flex between={2}>
          <Button
            className={cx.forgetButton}
            type="danger"
            onClick={handleForgetCard}
          >
            Forget
          </Button>

          <Button className={cx.rememberButton} onClick={handleRememberCard}>
            Remember
          </Button>
        </Flex>
      </>
    );
  }, [
    handleCheckCard,
    handleForgetCard,
    handleNextClick,
    handleRememberCard,
    nextCardButtonVisible,
  ]);

  if (!currentCard) {
    return <div>There are no cards to learn now</div>;
  }

  return (
    <Flex direction="column" between={2}>
      {nextCardButtonVisible && (
        <CardProgress
          reviews={currentCard.reviews.slice(-TIME_TO_REVIEW_AGAIN + 1)}
        />
      )}

      <div>{currentCard.definition}</div>

      {nextCardButtonVisible ? (
        <div>{currentCard.word}</div>
      ) : (
        <Input
          value={suggestion}
          ref={suggestionInputRef}
          disableAutoCorrect
          onInput={setSuggestion}
        />
      )}

      {actions}
    </Flex>
  );
};

export default memo(Learn);
