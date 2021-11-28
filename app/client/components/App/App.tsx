import 'regenerator-runtime/runtime';
import '../../styles/reset.pcss';
import 'boarder-components/dist/index.css';
import './App.pcss';
import { h, FunctionalComponent } from 'preact';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const App: FunctionalComponent = () => {
  return (
    <Switch>
      <Route exact path="/">
        <HomeLoadable />
      </Route>
    </Switch>
  );
};

export default App;
