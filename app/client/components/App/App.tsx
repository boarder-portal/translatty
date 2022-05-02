import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const PostsLoadable = loadable(
  () => import('client/components/pages/Posts/Posts'),
);

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLoadable />} />
        <Route path="/posts" element={<PostsLoadable />} />
      </Routes>
    </>
  );
};

export default App;
