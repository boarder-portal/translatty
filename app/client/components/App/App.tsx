import 'regenerator-runtime/runtime';
import './App.scss';
import 'boarder-components/dist/index.css';
import { h, FunctionalComponent } from 'preact';
import block from 'bem-cn';
import { Switch, Route } from 'react-router-dom';
import loadable from '@loadable/component';

const HomeLoadable = loadable(
  () => import('client/components/pages/Home/Home'),
);

const b = block('App');

const App: FunctionalComponent = () => {
  return (
    <div className={b()}>
      <Switch>
        <Route exact path="/">
          <HomeLoadable />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
