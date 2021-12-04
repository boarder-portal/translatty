import { ISub, TSubPair, ISubPath } from 'server/types/subs';

import getSubPairMatchScore from 'server/utilities/subs/getSubPairMatchScore';
import getParsedSubs from 'server/utilities/subs/getParsedSubs';

export default async function getSubPairs({
  serial,
  season,
  episode,
}: ISubPath): Promise<TSubPair[]> {
  const { en: enSubs, ru: ruSubs } = await getParsedSubs({
    serial,
    season,
    episode,
  });

  const subPairs: TSubPair[] = [];
  let translationIndexToStartFrom = 0;

  for (let originalIndex = 0; originalIndex < enSubs.length; originalIndex++) {
    const currentOriginalSub = enSubs[originalIndex];

    let bestScoreIndex = null;
    let bestScore = -Infinity;

    for (
      let translationIndex = translationIndexToStartFrom;
      translationIndex <
      Math.min(ruSubs.length, translationIndexToStartFrom + 5);
      translationIndex++
    ) {
      const currentTranslationSub = ruSubs[translationIndex];
      const score = getSubPairMatchScore(
        currentOriginalSub,
        currentTranslationSub,
      );

      if (score > bestScore) {
        bestScore = score;
        bestScoreIndex = translationIndex;
      }
    }

    if (bestScore > 0.7 && bestScoreIndex !== null) {
      translationIndexToStartFrom = bestScoreIndex + 1;

      subPairs.push([currentOriginalSub.text, ruSubs[bestScoreIndex].text]);
    }
  }

  return subPairs;
}
