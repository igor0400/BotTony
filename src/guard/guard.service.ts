import { changeMeOnText, repliesLocale } from '../locale/index.js';
import { attackEntity } from '../attack/index.js';
import { bot, botAction, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { getPlayer, replyMessage } from '../common/index.js';
import { followPlayer, moveToPos } from '../move/index.js';

export const startGuarding = async (playerName: string, isNew = true) => {
  const player = getPlayer(playerName);
  let result: {
    type?: 'player' | 'home';
    name?: string;
  };

  if (player && !player?.entity) {
    return false;
  }

  if (player?.entity) {
    result = {
      type: 'player',
      name: playerName,
    };
    const isSuccess = await followPlayer(playerName, false);
    if (!isSuccess) return false;
  } else {
    result = {
      type: 'home',
      name: 'home',
    };
    moveToPos(botData?.homeCords);
  }

  if (isNew) {
    await createAction({ type: 'guard', extraData: JSON.stringify(result) });
  }

  return result;
};

export const startGuardingChat = async (args: string[], username: string) => {
  const { startGuardHome, startGuardPlayer, startGuardError, playerAway } = repliesLocale;

  if (!args[0]) {
    return replyMessage(startGuardError());
  }

  const playerName = changeMeOnText(args[0], username);
  const player = getPlayer(playerName);

  await endAllActions();

  const guardEntity = await startGuarding(playerName);

  if (guardEntity) {
    const { type, name } = guardEntity;
    if (type === 'player') {
      replyMessage(startGuardPlayer(name));
    } else {
      replyMessage(startGuardHome());
    }
  } else {
    if (player && !player?.entity) {
      replyMessage(playerAway());
    } else {
      replyMessage(startGuardError());
    }
  }
};

export const stopGuarding = async () => {
  await endAction('guard');
};

export const endGuardingChat = async () => {
  let guardData = botAction?.extraData ? JSON.parse(botAction.extraData) : null;

  await stopGuarding();

  const { endGuardHome, endGuardPlayer } = repliesLocale;

  if (guardData) {
    const { type, name } = guardData;
    if (type === 'player') {
      replyMessage(endGuardPlayer(name));
    } else {
      replyMessage(endGuardHome());
    }
  }
};

export const onGuarding = async () => {
  if (botAction?.type !== 'guard') return;

  const filter = (e) => e.type === 'hostile' && e.position.distanceTo(bot?.entity?.position) < 8;

  const entity = bot.nearestEntity(filter);

  attackEntity(entity);
};
