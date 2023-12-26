import { Movements, goals } from 'mineflayer-pathfinder';
import { CordsType, replyMessage } from '../common';
import { bot, botData, changeBotFollow } from '../bot';
import { ownerName } from '../../config';
const { GoalFollow } = goals;

export const moveToPos = (position: CordsType) => {
  bot.pathfinder.setMovements(new Movements(bot));

  bot.pathfinder.setGoal(new goals.GoalBlock(position.x, position.y, position.z));
};

export const moveToPosChat = (args: string[], username: string = ownerName) => {
  const changedArgs = args.map((i) => (i === 'me' ? username : i));
  const point = changedArgs[0];

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
      return replyMessage('Мне нужны координаты в формате x y z или ник игрока');
    }

    cords = { x: Math.floor(+x), y: Math.floor(+y), z: Math.floor(+z) };
  }

  if (cords.x === botCords.x && cords.y === botCords.y && cords.z === botCords.z) {
    return replyMessage('Я уже тут!');
  }

  replyMessage('Уже бегу!');
  return moveToPos(cords);
};

export const followPlayer = async (playerName: string) => {
  const player = bot.players[playerName];

  if (!player?.entity) {
    return false;
  }

  await changeBotFollow({ isFollow: true, followUserName: playerName });

  const movements = new Movements(bot);
  movements.scafoldingBlocks = [];

  bot.pathfinder.setMovements(movements);

  const goal = new GoalFollow(player.entity, 3);
  bot.pathfinder.setGoal(goal, true);

  return true;
};

export const followPlayerChat = async (args: string[], username: string) => {
  const player = args[0]?.replaceAll('me', username) ?? username;

  const isSuccess = await followPlayer(player);
  if (isSuccess) {
    replyMessage(`Теперь я следую за ${botData.followUserName}`);
  } else {
    replyMessage(`Не понимаю за кем следовать`);
  }
};

export const unfollowPlayer = async () => {
  if (botData.isFollow) {
    await changeBotFollow({ isFollow: false, followUserName: null });
    bot.pathfinder.setGoal(null);
  }
};

export const unfollowPlayerChat = async () => {
  replyMessage(`Я больше не следую за ${botData.followUserName}`);
  await unfollowPlayer();
};
