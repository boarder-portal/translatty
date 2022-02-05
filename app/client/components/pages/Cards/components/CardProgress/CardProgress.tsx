import { memo, FC } from 'react';
import { Flex } from 'boarder-components';
import classNames from 'classnames';

import { ICardReview } from 'common/types/cards';

import { TIME_TO_REVIEW_AGAIN } from 'client/components/pages/Cards/constants';

import cx from './CardProgress.pcss';

interface ICardProgressProps {
  reviews: ICardReview[];
}

const CardProgress: FC<ICardProgressProps> = (props) => {
  const { reviews } = props;

  return (
    <Flex between={1}>
      {reviews.slice(-TIME_TO_REVIEW_AGAIN + 1).length
        ? reviews.map((review, index) => (
            <div
              key={index}
              className={classNames(
                cx.item,
                review.isCorrect ? cx.success : cx.failure,
              )}
            />
          ))
        : 'New word'}
    </Flex>
  );
};

export default memo(CardProgress);
