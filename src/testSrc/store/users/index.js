import { initState } from './initState';
import { increment } from './increment';

export const users = {
  ...initState,
  increment,
}
