import set from 'lodash.set';
import { actionType } from './constants';

const setActionCreator = (model, key, action, path) => {
  const actionCreator = payload => ({
    type: path.join('.'),
    payload,
    handler: action.handler,
  });
  set(model.actions, path, actionCreator);
};

const mapValuesToModel = (model, rawModel, path = []) => {
  Object.entries(rawModel).forEach(([key, value]) => {
    const currentPath = [...path, key];

    if (value?.type === actionType) {
      setActionCreator(model, key, value, currentPath);
      return;
    }

    if (typeof value === 'object' && !Array.isArray(value)) {
      mapValuesToModel(model, value, currentPath);
      return;
    }

    set(model.initState, currentPath, value);
  });
};

export const createActions = rawModel => {
  const model = { initState: {}, actions: {} };
  mapValuesToModel(model, rawModel);
  return model;
};
