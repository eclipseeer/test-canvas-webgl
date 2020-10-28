/*eslint-disable*/
import React, { useRef, useState, useEffect, useMemo, memo } from 'react';
import { Users } from './components/Users';
import { Posts } from './components/Posts';

import styles from '../../ui/styles/App.module.css';

export const TestApp = () => {
  // const counter = useStoreState(state => state.app.counter);
  // const counterUsers = useStoreState(state => state.users.counter);
  // const counterPosts = useStoreState(state => state.posts.counter);

  console.log('render App');
  return (
    <div className={styles.container}>
      <button onClick={() => {}}>dd</button>
      <Users />
      <Posts />
    </div>
  );
};

