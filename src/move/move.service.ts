import mineflayerPathfinder from 'mineflayer-pathfinder';
import { CordsType, replyMessage } from '../common/index.js';
import { bot, botAction, botData, createAction, endAction } from '../bot/index.js';
import { ownerName } from '../../config.js';
const { Movements, goals } = mineflayerPathfinder;
const { GoalFollow } = goals;

export const moveToPos = (position: CordsType) => {
  bot.pathfinder.setMovements(new Movements(bot));

  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));
};

export const moveToPosChat = (args: string[], username: string = ownerName) => {
  const changedArgs = args.map((i) => (i === 'me' ? username : i));
  const point = changedArgs[0];

  if (!point) {
    return replyMessage('Укажи куда идти! Могу на точку дома, к игроку или на координаты x y z');
  }

  const botCords = bot?.entity?.position?.floored();
  let cords: CordsType = bot.players[point]?.entity?.position?.floored();

  if (point.toLowerCase() === 'home') {
    cords = botData.homeCords;
  }

  if (!cords && bot.players[point] && !bot.players[point]?.entity) {
    return replyMessage('Ты слишком далеко, я тебя не вижу, напиши координаты в формате x y z');
  }

  if (!cords) {
    const [x, y, z] = changedArgs;
    if (!x || !y || !z) {
      return replyMessage('Мне нужны координаты в формате x y z, ник игрока или точка дома');
    }
    if (x && y && z && (!+x || !+y || !+z)) {
      return replyMessage('Неверно указаны координаты');
    }

    cords = { x: Math.floor(+x), y: Math.floor(+y), z: Math.floor(+z) };
  }

  if (cords.x === botCords.x && cords.y === botCords.y && cords.z === botCords.z) {
    return replyMessage('Я уже тут!');
  }

  replyMessage('Уже бегу!');
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
  const player = args[0]?.replaceAll('me', username) ?? username;

  const isSuccess = await followPlayer(player);
  if (isSuccess) {
    replyMessage(`Теперь я следую за ${player}`);
  } else {
    replyMessage(`Не понимаю за кем следовать`);
  }
};

export const unfollowPlayer = async () => {
  if (botAction?.type === 'follow') {
    await endAction('follow');
    bot.pathfinder.setGoal(null);
  }
};

export const unfollowPlayerChat = async () => {
  if (botAction?.type === 'follow') {
    replyMessage(`Я больше не следую за ${botAction.extraData}`);
    await unfollowPlayer();
  }
};
