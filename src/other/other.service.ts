import { changeMeOnText, isEntityWord, repliesLocale } from '../locale/index.js';
import { getPlayer, replyMessage } from '../common/index.js';
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
  const { notFoundPlayer, playerCords, myCords, whereBadArgs } = repliesLocale;

  if (!args[0]) {
    return replyMessage(whereBadArgs());
  }

  let target = changeMeOnText(args[0], username);

  if (isEntityWord('you', target)) {
    replyMessage(myCords(bot?.entity?.position?.floored()));
    return true;
  }

  const player = getPlayer(target);

  if (player?.entity) {
    replyMessage(playerCords(player.username, player?.entity?.position?.floored()));
    return true;
  } else {
    replyMessage(notFoundPlayer());
    return false;
  }
};
