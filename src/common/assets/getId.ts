import { v4 as uuid } from 'uuid';

export const getId = () => {
  return uuid();
};
