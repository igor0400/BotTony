import { repliesLocale } from '../locale/index.js';
import { replyMessage } from '../common/index.js';

export const sayHelloPlayer = (playerName: string) => {
  const { helloPlayer } = repliesLocale;

  replyMessage(helloPlayer(playerName));
};

export const sayByePlayer = (playerName: string) => {
  const { byePlayer } = repliesLocale;

  replyMessage(byePlayer(playerName));
};
