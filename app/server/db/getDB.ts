import path from 'path';
import fs from 'fs-extra';

import { IDB } from 'server/types/db';

export async function getDB(): Promise<IDB> {
  return fs.readJSON(path.resolve('./db.json'));
}
