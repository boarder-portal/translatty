import express from 'express';
import bodyParser from 'body-parser';

import getSub from 'server/api/handlers/getSub';
import userRouter from 'server/api/handlers/user/userRouter';

const apiRouter = express.Router();

apiRouter
  .use(bodyParser.json())
  .use('/user', userRouter)
  .get('/getSub', getSub);

export default apiRouter;
