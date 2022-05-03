import 'regenerator-runtime/runtime';
import { loadableReady } from '@loadable/component';
import { BrowserRouter } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { RecoilRoot } from 'recoil';

import setAtomsByState from 'common/utilities/setAtomsByState';

import App from 'client/components/App/App';

const rootEl = document.getElementById('root');

if (rootEl) {
  loadableReady(() => {
    hydrate(
      <BrowserRouter>
        <RecoilRoot
          initializeState={setAtomsByState(
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
