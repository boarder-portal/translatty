import 'regenerator-runtime/runtime';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

import createStore, { StoreContext } from 'common/utilities/store';

import App from 'client/components/App/App';

const rootEl = document.getElementById('root');

if (rootEl) {
  loadableReady(() => {
    const store = createStore(JSON.parse(window.initialState));

    hydrate(
      <BrowserRouter>
        <StoreContext.Provider value={store}>
          <App />
        </StoreContext.Provider>
      </BrowserRouter>,
      rootEl,
    );
  });
}
