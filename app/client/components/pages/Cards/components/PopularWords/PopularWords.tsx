import { memo, FC, useMemo, useCallback } from 'react';
import { Flex, Heading } from 'boarder-components';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { ICard } from 'common/types/cards';

import { POPULAR_WORDS } from 'client/components/pages/Cards/components/PopularWords/constants';

import cx from './PopularWords.pcss';

interface IPopularWordsProps {
  cards: ICard[];
}

const PopularWords: FC<IPopularWordsProps> = (props) => {
  const { cards } = props;

  const navigate = useNavigate();

  const learningWordsSet = useMemo(
    () => new Set(cards.map((card) => card.word)),
    [cards],
  );

  const handleClick = useCallback(
    (word: string) => {
      navigate(`/cards/add?word=${word}`);
    },
    [navigate],
  );

  return (
    <Flex direction="column" between={2}>
      <Heading level={1}>Popular words</Heading>

      {POPULAR_WORDS.map((word, index) => (
        <div
          key={index}
          className={classNames(
            learningWordsSet.has(word) ? cx.learningWord : '',
          )}
          onClick={() => handleClick(word)}
        >
          {word}
        </div>
      ))}
    </Flex>
  );
};

export default memo(PopularWords);
