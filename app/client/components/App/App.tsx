import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

import Head from 'client/components/App/components/Head/Head';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const SubsLoadable = loadable(
  () => import('client/components/pages/Subs/Subs'),
);

const RegisterLoadable = loadable(
  () => import('client/components/pages/Register/Register'),
);

const LoginLoadable = loadable(
  () => import('client/components/pages/Login/Login'),
);

const App: FC = () => {
  return (
    <>
      <Head />

      <Routes>
        <Route path="/" element={<HomeLoadable />} />
        <Route path="/subs" element={<SubsLoadable />} />
        <Route path="/register" element={<RegisterLoadable />} />
        <Route path="/login" element={<LoginLoadable />} />
      </Routes>
    </>
  );
};

export default App;
