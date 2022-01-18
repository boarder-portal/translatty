import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import FooterMenu from 'client/components/App/components/FooterMenu/FooterMenu';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const RegisterLoadable = loadable(
  () => import('client/components/pages/Register/Register'),
);

const LoginLoadable = loadable(
  () => import('client/components/pages/Login/Login'),
);

const CardsLoadable = loadable(
  () => import('client/components/pages/Cards/Cards'),
);

const SubsLoadable = loadable(
  () => import('client/components/pages/Subs/Subs'),
);

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLoadable />} />
        <Route path="/register" element={<RegisterLoadable />} />
        <Route path="/login" element={<LoginLoadable />} />
        <Route path="/cards/*" element={<CardsLoadable />} />
        <Route path="/subs" element={<SubsLoadable />} />
      </Routes>

      <FooterMenu />
    </>
  );
};

export default App;
