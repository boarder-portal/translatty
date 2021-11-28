import fs from 'fs-extra';
import path from 'path';

const DB_PATH = path.resolve(__dirname, '../../../db.json');

(async () => {
  await fs.ensureFile(DB_PATH);
  await fs.writeJSON(DB_PATH, {});
})();
