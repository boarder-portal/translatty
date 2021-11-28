import path from 'path';
import fs from 'fs-extra';

import { IDB } from 'server/types/db';

export async function writeDB(db: IDB): Promise<void> {
  await fs.writeJSON(path.resolve('./db.json'), db);
}
