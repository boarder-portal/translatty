import 'regenerator-runtime/runtime';
import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { Routes, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import { FC } from 'react';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const App: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLoadable />} />
    </Routes>
  );
};

export default App;
