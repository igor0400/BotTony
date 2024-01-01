import mineflayerPathfinder from 'mineflayer-pathfinder';
import { CordsType, replyMessage } from '../../common/index.js';
import { bot, botData, endAllActions } from '../../bot/index.js';
import { ownerName } from '../../../config.js';
import { isEntityWord, repliesLocale } from '../index.js';
const { Movements, goals } = mineflayerPathfinder;

export const moveToPos = (position: CordsType) => {
  bot.pathfinder.setMovements(new Movements(bot));
  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));
};

export const moveToPosChat = async (args: string[], username: string = ownerName) => {
  const changedArgs = args.map((i) => (isEntityWord('me', i) ? username : i));
  const point = changedArgs[0];

  const { nullGoArgs, farPlayer, nullCords, badCords, alreadyHere, alreadyRun, dontWriteMyName } = repliesLocale;

  if (!point) {
    return replyMessage(nullGoArgs());
  }

  if (point === botData.botName) {
    return replyMessage(dontWriteMyName());
  }

  const botCords = bot?.entity?.position?.floored();
  let cords: CordsType = bot.players[point]?.entity?.position?.floored();

  if (isEntityWord('home', point)) {
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

  await endAllActions();
  replyMessage(alreadyRun());
  return moveToPos(cords);
};
