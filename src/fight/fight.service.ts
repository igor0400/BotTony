import { getPlayer, replyMessage } from '../common/index.js';
import { attakPlayer, stopAttack } from '../attack/index.js';
import { changeMeOnText, repliesLocale } from '../locale/index.js';
import { botAction, createAction, endAction } from '../bot/index.js';

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
  const playerName = changeMeOnText(args[0], username);
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

export const stopFightOnPlayerDead = async (entity) => {
  const { killedPlayer } = repliesLocale;

  if (botAction?.type === 'fight' && botAction?.extraData?.toLowerCase() === entity?.username?.toLowerCase()) {
    replyMessage(killedPlayer(entity?.username));
    await endAction('fight');
  }
};
