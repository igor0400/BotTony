import { getPlayer, replyMessage } from '../common/index.js';
import { attakPlayer, stopAttack } from '../attack/index.js';
import { entitiesLocale, repliesLocale } from '../locale/index.js';
import { createAction } from '../bot/index.js';

export const fightPlayer = async (playerName: string, isNew = true) => {
  const player = getPlayer(playerName);

  if (!player?.entity) {
    return false;
  }

  if (isNew) {
    await createAction({ type: 'fight', extraData: playerName });
  }

  attakPlayer(playerName);
  return true;
};

export const fightPlayerChat = async (args: string[], username: string) => {
  const playerName = args[0]?.replaceAll(new RegExp(`(${entitiesLocale.me.join('|')})`, 'gi'), username);
  const { notFoundPlayer, startKill } = repliesLocale;

  const isFight = await fightPlayer(playerName);

  if (isFight) {
    replyMessage(startKill());
  } else {
    replyMessage(notFoundPlayer());
  }
};

export const stopFightPlayerChat = () => {
  const { dontKill } = repliesLocale;

  replyMessage(dontKill());
  stopAttack();
};
