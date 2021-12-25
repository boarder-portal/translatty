import express from 'express';
import bodyParser from 'body-parser';

import register from 'server/api/handlers/user/register';
import login from 'server/api/handlers/user/login';

const userRouter = express.Router();

userRouter
  .use(bodyParser.json())
  .post('/register', register)
  .post('/login', login);

export default userRouter;
