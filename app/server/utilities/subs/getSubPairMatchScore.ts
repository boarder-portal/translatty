import { ISub } from 'server/types/subs';

export default function getSubPairMatchScore(enSub: ISub, ruSub: ISub): number {
  const indexDiff = Math.abs(enSub.index - ruSub.index);
  const indexScore = Math.max(1 - indexDiff / 5, 0);

  const durationDiff = Math.abs(enSub.time.duration - ruSub.time.duration);
  const durationScore = Math.max(1 - durationDiff / enSub.time.duration, 0);

  const textLengthDiff = Math.abs(enSub.text.length - ruSub.text.length);
  const textLengthScore = Math.max(1 - textLengthDiff / enSub.text.length, 0);

  return indexScore * 0.25 + durationScore * 0.55 + textLengthScore * 0.2;
}
