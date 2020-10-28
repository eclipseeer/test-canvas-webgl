import React, { memo } from 'react';
import { useStoreState } from '../../store';

export const Posts = memo(() => {
  const counter = useStoreState(state => state.posts.counter);

  console.log('render Posts');
  return (
    <div style={{ backgroundColor: 'aqua' }}>
      <p>Posts, {counter}</p>
      <button onClick={() => {}}>Dispatch action</button>
    </div>
  );
});
