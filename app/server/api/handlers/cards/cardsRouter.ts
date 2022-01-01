import express from 'express';

import getCards from 'server/api/handlers/cards/getCards';
import addCard from 'server/api/handlers/cards/addCard';
import reviewCard from 'server/api/handlers/cards/reviewCard';

const cardsRouter = express.Router();

cardsRouter
  .get('/', getCards)
  .post('/add', addCard)
  .post('/review', reviewCard);

export default cardsRouter;
