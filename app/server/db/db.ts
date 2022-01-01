import fs from 'fs-extra';

import { ISubPath, TSubPair } from 'server/types/subs';
import { IDBUser } from 'server/types/user';
import { TDBCards } from 'server/types/db';

import {
  CARDS_DB_NAME,
  DB_FOLDER_PATH,
  USERS_DB_NAME,
} from 'server/db/constants';

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

  async getUsers(): Promise<IDBUser[]> {
    return fs.readJSON(`${DB_FOLDER_PATH}/${USERS_DB_NAME}.json`);
  }

  async writeUsers(users: IDBUser[]): Promise<void> {
    return fs.writeJSON(`${DB_FOLDER_PATH}/${USERS_DB_NAME}.json`, users);
  }

  async getCards(): Promise<TDBCards> {
    return fs.readJSON(`${DB_FOLDER_PATH}/${CARDS_DB_NAME}.json`);
  }

  async writeCards(cards: TDBCards): Promise<void> {
    return fs.writeJSON(`${DB_FOLDER_PATH}/${CARDS_DB_NAME}.json`, cards);
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
