import { changeMeOnText, repliesLocale } from '../locale/index.js';
import { attackEntity } from '../attack/index.js';
import { bot, botAction, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { getPlayer, replyMessage } from '../common/index.js';
import { followPlayer, moveToPos } from '../move/index.js';

export const startGuarding = async (initTarget: string, username: string, isNew = true) => {
  let target = changeMeOnText(initTarget, username);
  const player = getPlayer(target);
  let result: {
    type?: 'player' | 'home';
    name?: string;
  };

  if (player?.entity) {
    result = {
      type: 'player',
      name: target,
    };
    const isSuccess = await followPlayer(target, false);
    if (!isSuccess) return false;
  } else {
    result = {
      type: 'home',
    };
    moveToPos(botData?.homeCords);
  }

  if (isNew) {
    await createAction({ type: 'guard', extraData: JSON.stringify(result) });
  }

  return result;
};

export const startGuardingChat = async (args: string[], username: string) => {
  const initTarget = args[0];

  const { startGuardHome, startGuardPlayer, startGuardError } = repliesLocale;

  if (!initTarget) {
    return replyMessage(startGuardError());
  }

  await endAllActions();

  const guardEntity = await startGuarding(initTarget, username);

  if (guardEntity) {
    const { type, name } = guardEntity;
    if (type === 'player') {
      replyMessage(startGuardPlayer(name));
    } else {
      replyMessage(startGuardHome());
    }
  } else {
    replyMessage(startGuardError());
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
