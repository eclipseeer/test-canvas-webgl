import React, { memo } from 'react';
import { useStoreState, useAction } from '../../store';

export const Users = memo(() => {
  const counter = useStoreState(state => state.users.counter);
  const increment = useAction(actions => actions.users.increment);
  console.log('render Users');
  return (
    <div style={{ backgroundColor: 'red' }}>
      <p>Users, {counter}</p>
      <button onClick={() => increment()}>Dispatch action</button>
    </div>
  );
});
