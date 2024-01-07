import mineflayerPathfinder from 'mineflayer-pathfinder';
import { CordsType, getPlayer, replyMessage } from '../common/index.js';
import { bot, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { ownerName } from '../../config.js';
import { isEntityWord, repliesLocale } from '../locale/index.js';
const { Movements, goals } = mineflayerPathfinder;

export let isGoalReached = false;

export const setIsGoalReached = (value: boolean) => {
  isGoalReached = value;
};

export const moveToPos = (position: CordsType) => {
  const defaultMove = new Movements(bot);
  defaultMove.canOpenDoors = true;

  isGoalReached = false;

  bot.pathfinder.setMovements(defaultMove);
  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));
};

export const moveToPosPromise = (position: CordsType) => {
  moveToPos(position);

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (isGoalReached) {
        clearInterval(interval);
        resolve(true);
      }
    }, 100);
  });
};

export const moveToPosChat = async (args: string[], username: string = ownerName) => {
  const changedArgs = args.map((i) => (isEntityWord('me', i) ? username : i));
  const point = changedArgs[0];
  const player = getPlayer(point);

  const { nullGoArgs, farPlayer, nullCords, badCords, alreadyHere, alreadyRun, dontWriteMyName, iInPosition } =
    repliesLocale;

  if (!point) {
    return replyMessage(nullGoArgs());
  }

  if (point === botData.botName) {
    return replyMessage(dontWriteMyName());
  }

  const botCords = bot?.entity?.position?.floored();
  let cords: CordsType = player?.entity?.position?.floored();

  if (isEntityWord('home', point)) {
    cords = botData.homeCords;
  }

  if (!cords && player && !player?.entity) {
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

  await createAction({ type: 'go', extraData: JSON.stringify(cords) });

  replyMessage(alreadyRun());
  await moveToPosPromise(cords);

  replyMessage(iInPosition());
  await endAction('go');
};
