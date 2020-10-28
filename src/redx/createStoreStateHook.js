import { useEffect, useRef, useState } from 'react';

// При підписці треба мати 2 функції:
// 1 - Повідомляти компонент, коли в стейті відбулись зміни
// 2 - Повідомляти компонент коли змінився селектор даних зі стейту

export const createStoreStateHook = store => selector => {
  const [, provokeUpdate] = useState(false);
  const selectorRef = useRef();
  const stateSliceRef = useRef();

  selectorRef.current = selector;
  stateSliceRef.current = selector(store.getState());

  useEffect(() => {
    const unsubscribe = store.subscribe(state => {
      if (Object.is(stateSliceRef.current, selectorRef.current(state))) return;
      provokeUpdate(v => !v);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return stateSliceRef.current;
};
