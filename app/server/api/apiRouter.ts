import express from 'express';
import bodyParser from 'body-parser';

import fetchPosts from 'server/api/utilities/fetchPosts';

const apiRouter = express.Router();

apiRouter.use(bodyParser.json()).get('/getPosts', async (req, res) => {
  const posts = await fetchPosts();

  res.status(200).json(posts);
});

export default apiRouter;
