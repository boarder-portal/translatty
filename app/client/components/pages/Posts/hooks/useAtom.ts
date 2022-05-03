import { useCallback, useContext, useEffect, useState } from 'react';

import { IState, StoreContext } from 'common/utilities/store';

export default function useAtom<K extends keyof IState>(
  key: K,
): [IState[K], (v: IState[K]) => void] {
  const store = useContext(StoreContext);
  const [value, setValue] = useState<IState[K]>(store.value[key]);

  useEffect(() => {
    store.listeners[key].push(setValue);

    return () => {
      store.listeners[key].splice(store.listeners[key].indexOf(setValue), 1);
    };
  }, [key, store.listeners]);

  const setAtomValue = useCallback(
    (value: IState[K]) => {
      store.value[key] = value;

      store.listeners[key].forEach((listener) => {
        listener(value);
      });
    },
    [key, store.listeners, store.value],
  );

  return [value, setAtomValue];
}
