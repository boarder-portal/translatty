import 'regenerator-runtime/runtime';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { RecoilRoot } from 'recoil';

import recoilStateToAtoms from 'common/utilities/recoilStateToAtoms';

import App from 'client/components/App/App';

const rootEl = document.getElementById('root');

if (rootEl) {
  loadableReady(() => {
    hydrate(
      <BrowserRouter>
        <RecoilRoot
          initializeState={recoilStateToAtoms(
            JSON.parse(window.initialRecoilState),
          )}
        >
          <App />
        </RecoilRoot>
      </BrowserRouter>,
      rootEl,
    );
  });
}
