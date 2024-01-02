import { getRandomInt } from '../../common/index.js';

export const getRandomMess = (messages: string[]) => {
  return messages[getRandomInt(0, messages.length)];
};
