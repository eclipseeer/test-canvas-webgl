import { configureStore } from '../../redx';
import { users } from './users';
import { posts } from './posts';

const initState = {
  app: {
    counter: 0,
  },
  users,
  posts,
};

export const { store, useStoreState, useAction } = configureStore(initState);
