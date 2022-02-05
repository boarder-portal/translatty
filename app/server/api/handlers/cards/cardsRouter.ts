import express from 'express';

import getCards from 'server/api/handlers/cards/getCards';
import addCard from 'server/api/handlers/cards/addCard';
import editCard from 'server/api/handlers/cards/editCard';
import reviewCard from 'server/api/handlers/cards/reviewCard';

const cardsRouter = express.Router();

cardsRouter
  .get('/', getCards)
  .post('/add', addCard)
  .post('/edit', editCard)
  .post('/review', reviewCard);

export default cardsRouter;
