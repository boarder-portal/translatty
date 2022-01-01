import express from 'express';

import register from 'server/api/handlers/user/register';
import login from 'server/api/handlers/user/login';

const userRouter = express.Router();

userRouter.post('/register', register).post('/login', login);

export default userRouter;
