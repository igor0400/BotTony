import { changeMeOnText, isEntityWord, repliesLocale } from '../locale/index.js';
import { getPlayerWithErrMess, replyMessage } from '../common/index.js';
import { bot } from '../bot/index.js';

export const sayHelloPlayer = (playerName: string) => {
  const { helloPlayer } = repliesLocale;

  replyMessage(helloPlayer(playerName));
};

export const sayByePlayer = (playerName: string) => {
  const { byePlayer } = repliesLocale;

  replyMessage(byePlayer(playerName));
};

export const whereChat = (args: string[], username: string) => {
  const { playerCords, myCords, whereBadArgs } = repliesLocale;

  if (!args[0]) {
    return replyMessage(whereBadArgs());
  }

  let target = changeMeOnText(args[0], username);

  if (isEntityWord('you', target)) {
    replyMessage(myCords(bot?.entity?.position?.floored()));
    return true;
  }

  const player = getPlayerWithErrMess(target);
  if (!player) return false;

  replyMessage(playerCords(player.username, player?.entity?.position?.floored()));
  return true;
};
