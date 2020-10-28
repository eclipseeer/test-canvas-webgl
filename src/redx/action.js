import { actionType } from './constants';

export const action = handler => ({
  type: actionType,
  handler,
});

