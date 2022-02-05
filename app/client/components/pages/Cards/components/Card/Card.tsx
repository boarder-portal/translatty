import { memo, FC, useMemo, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Flex, Heading } from 'boarder-components';
import last from 'lodash/last';
import dayjs from 'dayjs';

import { ICard } from 'common/types/cards';

import getCardLastReviewsDiff from 'client/components/pages/Cards/utilities/getCardLastReviewsDiff';
import { HUMAN_SHORT_DATE_WITH_TIME_FORMAT } from 'common/utilities/date/formats';

import CardProgress from 'client/components/pages/Cards/components/CardProgress/CardProgress';
import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';

import cx from './Card.pcss';

interface ICardProps {
  cards: ICard[];
}

const Card: FC<ICardProps> = (props) => {
  const { cards } = props;

  const { id } = useParams();
  const navigate = useNavigate();

  const card = useMemo(() => cards.find((c) => c.id === id), [cards, id]);

  const handleEditClick = useCallback(() => {
    navigate(`/cards/card/${id}/edit`);
  }, [id, navigate]);

  const nextReview = useMemo(() => {
    if (!card) {
      return null;
    }

    const lastReview = last(card.reviews);

    if (!lastReview || !lastReview.isCorrect) {
      return 'Review available now';
    }

    const minTimeSinceLastReview =
      TIME_TO_REVIEW_AGAIN[getCardLastReviewsDiff(card)];

    const nextReviewAt = lastReview.date + minTimeSinceLastReview;

    if (Date.now() > nextReviewAt) {
      return 'Review available now';
    }

    return `Next review: ${dayjs(nextReviewAt).format(
      HUMAN_SHORT_DATE_WITH_TIME_FORMAT,
    )}`;
  }, [card]);

  if (!card) {
    return null;
  }

  return (
    <Flex direction="column" between={2}>
      <CardProgress reviews={card.reviews} />

      <Heading level={1}>{card.word}</Heading>

      <div>{card.definition}</div>

      {card.examples.length ? (
        <Flex direction="column" between={2}>
          <Heading level={5}>Examples</Heading>
          <div>{card.examples.join('\n')}</div>
        </Flex>
      ) : null}

      <div className={cx.nextReview}>{nextReview}</div>

      <Button onClick={handleEditClick}>Edit</Button>
    </Flex>
  );
};

export default memo(Card);
