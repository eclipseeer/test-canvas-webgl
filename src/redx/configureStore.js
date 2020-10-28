import { createActions } from './createActions';
import { createStore } from './createStore';
import { createStoreStateHook } from './createStoreStateHook';
import { createStoreActionHook } from './createStoreActionHook';

export const configureStore = model => {
  const { initState, actions } = createActions(model);
  const store = createStore(initState);

  const useStoreState = createStoreStateHook(store);
  const useAction = createStoreActionHook(store, actions);

  return {
    store,
    useStoreState,
    useAction,
  };
};
