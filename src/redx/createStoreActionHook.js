export const createStoreActionHook = (store, actions) => selector => {
  return payload => {
    store.dispatch(selector(actions)(payload));
  };
};
