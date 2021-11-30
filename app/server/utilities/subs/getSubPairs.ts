import { ISub, ISubPair } from 'server/types/subs';

import getSubPairMatchScore from 'server/utilities/subs/getSubPairMatchScore';

export default function getSubPairs(
  enSubs: ISub[],
  ruSubs: ISub[],
): ISubPair[] {
  const subPairs: ISubPair[] = [];
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

      subPairs.push({
        original: currentOriginalSub.text,
        translation: ruSubs[bestScoreIndex].text,
      });
    }
  }

  return subPairs;
}
