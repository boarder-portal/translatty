if (process.env.NODE_ENV === 'development') {
  require('preact/debug');
}

import { h, hydrate } from 'preact';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';

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
