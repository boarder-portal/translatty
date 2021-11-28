import express from 'express';
import bodyParser from 'body-parser';

const apiRouter = express.Router();

apiRouter
  .use(bodyParser.json())
  // .get('/room', getRoom)

export default apiRouter;
