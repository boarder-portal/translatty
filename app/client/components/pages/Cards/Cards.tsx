import { memo, FC, useState, useEffect, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'boarder-components';

import { ICard } from 'common/types/cards';

import httpClient from 'client/utilities/HttpClient/HttpClient';

import List from 'client/components/pages/Cards/components/List/List';
import AddCard from 'client/components/pages/Cards/components/AddCard/AddCard';
import Learn from 'client/components/pages/Cards/components/Learn/Learn';
import Card from 'client/components/pages/Cards/components/Card/Card';
import EditCard from 'client/components/pages/Cards/components/EditCard/EditCard';

const Cards: FC = () => {
  const [cards, setCards] = useState<ICard[] | null>(null);

  useEffect(() => {
    (async () => {
      const { cards: requestedCards } = await httpClient.getCards();

      setCards(requestedCards);
    })();
  }, []);

  const routes = useMemo(() => {
    if (!cards) {
      return null;
    }

    return (
      <Routes>
        <Route path="/" element={<List cards={cards} />} />

        <Route
          path="/learn"
          element={<Learn cards={cards} setCards={setCards} />}
        />

        <Route path="/add" element={<AddCard setCards={setCards} />} />
        <Route path="/card/:id" element={<Card cards={cards} />} />

        <Route
          path="/card/:id/edit"
          element={<EditCard cards={cards} setCards={setCards} />}
        />
      </Routes>
    );
  }, [cards]);

  return <Container>{routes}</Container>;
};

export default memo(Cards);
