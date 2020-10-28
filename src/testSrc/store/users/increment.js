import { action } from '../../../redx';

export const increment = action((slice, payload, state) => {
  slice.counter += 1;
});
