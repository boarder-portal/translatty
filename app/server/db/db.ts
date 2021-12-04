import path from 'path';
import fs from 'fs-extra';

import { TSubPair, ISubPath } from 'server/types/subs';

const DB_FOLDER_PATH = path.resolve('./DB');

type TParsedSubs = Partial<Record<string, TSubPair[]>>;

class DB {
  async generate() {
    const hasDbAlreadyGenerated = fs.existsSync(DB_FOLDER_PATH);

    if (hasDbAlreadyGenerated) {
      throw new Error('DB has already generated');
    }

    await fs.mkdir(`${DB_FOLDER_PATH}`);
    await fs.writeJSON(`${DB_FOLDER_PATH}/parsedSubs.json`, {});
  }

  getSubKey({ serial, season, episode }: ISubPath) {
    return [serial, season, episode].join('.');
  }

  async getParsedSubs(): Promise<TParsedSubs> {
    return fs.readJSON(`${DB_FOLDER_PATH}/parsedSubs.json`);
  }

  async writeParsedSubs(parsedSubs: TParsedSubs): Promise<void> {
    await fs.writeJSON(`${DB_FOLDER_PATH}/parsedSubs.json`, parsedSubs);
  }

  async addParsedSubs({
    serial,
    season,
    episode,
    subPairs,
  }: ISubPath & {
    subPairs: TSubPair[];
  }) {
    const currentParsedSubs = await this.getParsedSubs();

    const newKey = this.getSubKey({ serial, season, episode });

    if (currentParsedSubs[newKey]) {
      throw new Error(`${newKey} has already parsed`);
    }

    await this.writeParsedSubs({
      ...currentParsedSubs,
      [newKey]: subPairs,
    });
  }
}

const db = new DB();

export default db;
