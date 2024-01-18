import mineflayerPathfinder from 'mineflayer-pathfinder';
import { CordsType, getPlayer, replyMessage } from '../common/index.js';
import { bot, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { ownerName } from '../../config.js';
import { isEntityWord, repliesLocale } from '../locale/index.js';
const { Movements, goals } = mineflayerPathfinder;

export const moveToPos = async (position: CordsType) => {
  const defaultMove = new Movements(bot);
  defaultMove.canOpenDoors = true;

  bot.pathfinder.setMovements(defaultMove);
  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));

  return new Promise((resolve) => {
    bot.on('goal_reached', async () => {
      resolve(true);
    });
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
  let cords: CordsType = player?.entity?.position?.offset(1, 0, 1);

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

  replyMessage(alreadyRun());

  await createAction({ type: 'go', extraData: JSON.stringify(cords) });
  await moveToPos(cords);
  await endAction('go');

  replyMessage(iInPosition());
};
