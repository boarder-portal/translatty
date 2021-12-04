import fs from 'fs-extra';
import path from 'path';

import { ISub, ISubPath, ISubTime } from 'server/types/subs';

function removeBOM(str: string): string {
  return str.charCodeAt(0) === 0xfeff ? str.substr(1) : str;
}

function parseTime(rawTime: string): number {
  const [rawMainTime, rawMs] = rawTime.split(',');

  const [rawHours, rawMinutes, rawSeconds] = rawMainTime.split(':');

  return (
    Number(rawHours) * 60 * 60 * 1000 +
    Number(rawMinutes) * 60 * 1000 +
    Number(rawSeconds) * 1000 +
    Number(rawMs)
  );
}

export default async function getParsedLanguageSubs({
  serial,
  season,
  episode,
  language,
}: ISubPath & {
  language: 'en' | 'ru';
}) {
  const fileContent = removeBOM(
    await fs.readFile(
      path.resolve(
        `./app/server/db/subs/${serial}/${season}/${episode}${language}.srt`,
      ),
      'utf8',
    ),
  );

  const splitter = fileContent.indexOf('\r\n') === -1 ? '\n' : '\r\n';
  const lines = fileContent.split(splitter);

  const subs: ISub[] = [];

  let currentIndex: number | null = null;
  let currentTime: ISubTime | null = null;
  let currentText = '';

  for (const line of lines) {
    if (!line) {
      if (currentTime && currentText && currentIndex) {
        subs.push({
          index: currentIndex,
          time: currentTime,
          text: currentText,
        });
      }

      currentIndex = null;
      currentTime = null;
      currentText = '';

      continue;
    }

    if (!currentIndex) {
      currentIndex = Number(line);

      continue;
    }

    if (!currentTime) {
      const [rawStart, rawEnd] = line.split(' --> ');

      const startTime = Number(parseTime(rawStart));
      const endTime = Number(parseTime(rawEnd));

      currentTime = {
        start: startTime,
        end: endTime,
        duration: endTime - startTime,
      };

      continue;
    }

    currentText = currentText ? `${currentText} ${line}` : line;
  }

  return subs;
}
