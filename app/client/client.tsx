import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';

import App from 'client/components/App/App';

const rootEl = document.getElementById('root');

if (rootEl) {
  loadableReady(() => {
    hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      rootEl,
    );
  });
}
