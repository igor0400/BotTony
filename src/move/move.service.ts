import mineflayerPathfinder from 'mineflayer-pathfinder';
import { CordsType, replyMessage } from '../common/index.js';
import { bot, botAction, botData, createAction, endAction } from '../bot/index.js';
import { ownerName } from '../../config.js';
import { entitiesLocale, repliesLocale } from '../locale/index.js';
const { Movements, goals } = mineflayerPathfinder;
const { GoalFollow } = goals;

export const moveToPos = (position: CordsType) => {
  bot.pathfinder.setMovements(new Movements(bot));

  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));
};

export const moveToPosChat = (args: string[], username: string = ownerName) => {
  const changedArgs = args.map((i) => (entitiesLocale.me.includes(i.toLowerCase()) ? username : i));
  const point = changedArgs[0];

  const { nullGoArgs, farPlayer, nullCords, badCords, alreadyHere, alreadyRun } = repliesLocale;

  if (!point) {
    return replyMessage(nullGoArgs());
  }

  const botCords = bot?.entity?.position?.floored();
  let cords: CordsType = bot.players[point]?.entity?.position?.floored();

  if (point.toLowerCase() === 'home') {
    cords = botData.homeCords;
  }

  if (!cords && bot.players[point] && !bot.players[point]?.entity) {
    return replyMessage(farPlayer());
  }

  if (!cords) {
    const [x, y, z] = changedArgs;
    if (!x || !y || !z) {
      return replyMessage(nullCords());
    }
    if (x && y && z && (!+x || !+y || !+z)) {
      return replyMessage(badCords());
    }

    cords = { x: Math.floor(+x), y: Math.floor(+y), z: Math.floor(+z) };
  }

  if (cords.x === botCords.x && cords.y === botCords.y && cords.z === botCords.z) {
    return replyMessage(alreadyHere());
  }

  replyMessage(alreadyRun());
  return moveToPos(cords);
};

export const followPlayer = async (playerName: string, isNew = true) => {
  const player = bot.players[playerName];

  if (!player?.entity) {
    return false;
  }

  if (isNew) {
    await createAction({ type: 'follow', extraData: playerName });
  }

  const movements = new Movements(bot);
  movements.scafoldingBlocks = [];

  bot.pathfinder.setMovements(movements);

  const goal = new GoalFollow(player.entity, 2);
  bot.pathfinder.setGoal(goal, true);

  return true;
};

export const followPlayerChat = async (args: string[], username: string) => {
  const player = args[0]?.replaceAll(RegExp(`(${entitiesLocale.me.join('|')})`, 'gi'), username) ?? username;
  const { startFollow, startFollowError } = repliesLocale;

  const isSuccess = await followPlayer(player);
  if (isSuccess) {
    replyMessage(startFollow(player));
  } else {
    replyMessage(startFollowError());
  }
};

export const unfollowPlayer = async () => {
  if (botAction.value?.type === 'follow') {
    await endAction('follow');
    bot.pathfinder.setGoal(null);
  }
};

export const unfollowPlayerChat = async () => {
  const { unfollow } = repliesLocale;

  console.log('follow', botAction);
  // не меняет botAction.value
  // меняет, но функция не видит этого
  // поменять обратно на botAction?.type

  if (botAction.value?.type === 'follow') {
    replyMessage(unfollow(botAction.value.extraData));
    await unfollowPlayer();
  }
};
