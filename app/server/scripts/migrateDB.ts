import fs from 'fs-extra';
import times from 'lodash/times';
import first from 'lodash/first';
import last from 'lodash/last';
import uuid from 'uuid/v4';

import { IDBMeta } from 'server/types/db';

import { DB_FOLDER_PATH } from 'server/db/constants';

interface IMigration {
  version: number;
  forward(): Promise<void>;
  backward(): Promise<void>;
}

const INITIAL_META: IDBMeta = {
  version: 1,
};

async function getMeta() {
  let meta = null;

  try {
    meta = await fs.readJSON(`${DB_FOLDER_PATH}/meta.json`);
  } catch (err) {
    meta = INITIAL_META;

    await fs.writeJSON(`${DB_FOLDER_PATH}/meta.json`, meta);
  }

  return meta;
}

const MIGRATIONS: IMigration[] = [
  {
    version: 2,
    async forward() {
      await fs.writeJSON(`${DB_FOLDER_PATH}/users.json`, []);
    },
    async backward() {
      await fs.remove(`${DB_FOLDER_PATH}/users.json`);
    },
  },
  {
    version: 3,
    async forward() {
      const users = await fs.readJSON(`${DB_FOLDER_PATH}/users.json`);

      await fs.writeJSON(
        `${DB_FOLDER_PATH}/cards.json`,
        users.reduce((accCards: any, user: any) => {
          accCards[user.login] = [];

          return accCards;
        }, {}),
      );
    },
    async backward() {
      await fs.remove(`${DB_FOLDER_PATH}/cards.json`);
    },
  },
  {
    version: 4,
    async forward() {
      const cardsByUsers = await fs.readJSON(`${DB_FOLDER_PATH}/cards.json`);

      Object.values<any[]>(cardsByUsers).forEach((userCards) => {
        userCards.forEach((card) => {
          card.reviews = card.startLearnAt
            ? times(card.reviewedTimes, (index) => ({
                isCorrect: true,
                date: index === 0 ? card.startLearnAt : card.lastReviewedAt,
              }))
            : [];

          card.id = uuid();

          delete card.startLearnAt;
          delete card.lastReviewedAt;
          delete card.reviewedTimes;
        });
      });

      await fs.writeJSON(`${DB_FOLDER_PATH}/cards.json`, cardsByUsers);
    },
    async backward() {
      const cardsByUsers = await fs.readJSON(`${DB_FOLDER_PATH}/cards.json`);

      Object.values<any[]>(cardsByUsers).forEach((userCards) => {
        userCards.forEach((card) => {
          card.startLearnAt = first<any>(card.reviews)?.date || null;
          card.lastReviewedAt = last<any>(card.reviews)?.date || null;
          card.reviewedTimes = card.reviews.length;

          delete card.reviews;
        });
      });

      await fs.writeJSON(`${DB_FOLDER_PATH}/cards.json`, cardsByUsers);
    },
  },
];

(async () => {
  const meta = await getMeta();

  for (const migration of MIGRATIONS) {
    if (migration.version <= meta.version) {
      continue;
    }

    await migration.forward();

    await fs.writeJSON(`${DB_FOLDER_PATH}/meta.json`, {
      ...meta,
      version: migration.version,
    });

    console.log(`DB migrated to version: ${migration.version}`);
  }
})();
