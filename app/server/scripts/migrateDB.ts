import fs from 'fs-extra';

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
