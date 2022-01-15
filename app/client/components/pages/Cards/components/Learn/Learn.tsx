import { FC, memo, useCallback, useMemo, useRef, useState } from 'react';
import first from 'lodash/first';
import shuffle from 'lodash/shuffle';
import { Button, Flex, Heading, Input } from 'boarder-components';
import last from 'lodash/last';
import dayjs from 'dayjs';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';
import isCardLearnedToday from 'client/components/pages/Cards/utilities/isCardLearnedToday';
import getCardLastReviewsDiff from 'client/components/pages/Cards/utilities/getCardLastReviewsDiff';

import CardProgress from 'client/components/pages/Cards/components/CardProgress/CardProgress';
import {
  MINUTE,
  TIME_TO_REVIEW_AGAIN,
} from 'client/components/pages/Cards/constants';

import cx from './Learn.pcss';

interface ILearnProps {
  cards: ICard[];
  setCards(cards: ICard[]): void;
}

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

    const reviewsDiff = Math.max(getCardLastReviewsDiff(card), 1);

    if (timeLeftSinceLastReview > TIME_TO_REVIEW_AGAIN[reviewsDiff]) {
      cardsToLearn.push(card);
    }
  }

  return shuffle(cardsToLearn);
}

function getNewCards(cards: ICard[]): ICard[] {
  return cards.filter((card) => card.reviews.length === 0);
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

  const additionalNewCards = useMemo(() => {
    if (cardsToLearn.length > 0) {
      return [];
    }

    return getNewCards(cards);
  }, [cards, cardsToLearn.length]);

  const updateCurrentAndAllCards = useCallback(
    async (currentCardId: string, isCorrect: boolean) => {
      if (!isCorrect) {
        const lastReview = last(currentCard?.reviews);

        if (!lastReview || !lastReview.isCorrect) {
          return;
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

  const handleLearnAdditionalNewWords = useCallback(() => {
    setCardsToLearn(shuffle(additionalNewCards.slice(0, 5)));
  }, [additionalNewCards]);

  const actions = useMemo(() => {
    if (nextCardButtonVisible) {
      return <Button onClick={handleNextClick}>Next</Button>;
    }

    return (
      <>
        <Button onClick={handleCheckCard}>Check</Button>

        <div className={cx.forgetAndRememberActions}>
          <Button type="danger" onClick={handleForgetCard}>
            Forget
          </Button>

          <Button onClick={handleRememberCard}>Remember</Button>
        </div>
      </>
    );
  }, [
    handleCheckCard,
    handleForgetCard,
    handleNextClick,
    handleRememberCard,
    nextCardButtonVisible,
  ]);

  if (additionalNewCards.length) {
    return (
      <Flex direction="column" between={2}>
        <Heading level={1}>Great job!</Heading>

        <div>Want to learn more new words?</div>

        <Button onClick={handleLearnAdditionalNewWords}>Learn</Button>
      </Flex>
    );
  }

  if (!cards.length) {
    return (
      <Flex direction="column" between={2}>
        <Heading level={1}>No words :(</Heading>

        <div>Add new words and come back!</div>
      </Flex>
    );
  }

  if (!currentCard) {
    return (
      <Flex direction="column" between={2}>
        <Heading level={1}>Great job!</Heading>

        <div>You have learned all words for today. Come back later.</div>
      </Flex>
    );
  }

  return (
    <Flex direction="column" between={2}>
      {(nextCardButtonVisible || currentCard.reviews.length === 0) && (
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
