import produce from 'immer';

const getStateSlice = (state, type) => {
  const path = type.split('.');
  path.pop();
  // replace with lodash.get
  return path.reduce((acc, key) => acc[key], state);
};

export const createStore = initState => {
  let state = initState;
  let subscribers = [];

  // Move to hooks
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect();
  devTools.init(initState);

  const dispatch = ({ type, payload, handler }) => {
    state = produce(state, draft => {
      handler(getStateSlice(draft, type), payload, draft);
    });
    subscribers.forEach(callback => callback(state));
    // Move to hooks
    devTools.send({ type, payload }, state);
  };

  const subscribe = callback => {
    subscribers.push(callback);
    return () => {
      subscribers = subscribers.filter(cb => cb !== callback);
    };
  };

  return {
    getState: () => state,
    dispatch,
    subscribe,
  };
};
