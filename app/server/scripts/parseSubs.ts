import path from 'path';
import fs, { Dirent } from 'fs-extra';

import getSubPairs from 'server/utilities/subs/getSubPairs';

import db from 'server/db/db';

const SUBS_PATH = path.resolve('./app/server/db/subs');

async function getDirents(path: string): Promise<Dirent[]> {
  return fs.readdir(path, { withFileTypes: true });
}

async function getFolders(path: string): Promise<string[]> {
  return (await getDirents(path))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

async function getFiles(path: string): Promise<string[]> {
  return (await getDirents(path))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => dirent.name);
}

(async () => {
  const parsedSubsKeys = Object.keys(await db.getParsedSubs());

  const serials = await getFolders(SUBS_PATH);

  for (const serial of serials) {
    const serialPath = `${SUBS_PATH}/${serial}`;

    const seasons = await getFolders(serialPath);

    for (const season of seasons) {
      const seasonPath = `${serialPath}/${season}`;

      const episodesSubs = await getFiles(seasonPath);

      const episodes = new Set(
        ...episodesSubs.map(
          (episodeSubFileName) => episodeSubFileName.match(/^\d+/)?.[0],
        ),
      );

      for (const episode of episodes) {
        if (
          parsedSubsKeys.includes(db.getSubKey({ serial, season, episode }))
        ) {
          continue;
        }

        await db.addParsedSubs({
          serial,
          season,
          episode,
          subPairs: await getSubPairs({ serial, season, episode }),
        });
      }
    }
  }
})();
