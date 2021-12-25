import 'regenerator-runtime/runtime';
import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';

import Head from 'client/components/App/components/Head/Head';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const SubsLoadable = loadable(
  () => import('client/components/pages/Subs/Subs'),
);

const App: FC = () => {
  return (
    <>
      <Head />

      <Routes>
        <Route path="/" element={<HomeLoadable />} />
        <Route path="/subs" element={<SubsLoadable />} />
      </Routes>
    </>
  );
};

export default App;
