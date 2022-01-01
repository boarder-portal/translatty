import express from 'express';
import bodyParser from 'body-parser';

import getSub from 'server/api/handlers/getSub';
import userRouter from 'server/api/handlers/user/userRouter';
import cardsRouter from 'server/api/handlers/cards/cardsRouter';

const apiRouter = express.Router();

apiRouter
  .use(bodyParser.json())
  .use('/user', userRouter)
  .use('/cards', cardsRouter)
  .get('/getSub', getSub);

export default apiRouter;
