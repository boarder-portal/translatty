import db from 'server/db/db';

(async () => {
  await db.generate();
})();
