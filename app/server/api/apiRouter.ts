import express from 'express';
import bodyParser from 'body-parser';

import getSub from 'server/api/handlers/getSub';

const apiRouter = express.Router();

apiRouter.use(bodyParser.json()).get('/getSub', getSub);

export default apiRouter;
