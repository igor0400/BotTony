import mineflayerPathfinder from 'mineflayer-pathfinder';
import { getPlayer, replyMessage } from '../common/index.js';
import { bot, botAction, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { entitiesLocale, repliesLocale } from '../locale/index.js';
const { Movements, goals } = mineflayerPathfinder;
const { GoalFollow } = goals;

export const followPlayer = async (playerName: string, isNew = true) => {
  const player = getPlayer(playerName);

  if (!player?.entity) {
    return false;
  }

  if (isNew) {
    await createAction({ type: 'follow', extraData: playerName });
  }

  const movements = new Movements(bot);
  movements.scafoldingBlocks = [];

  bot.pathfinder.setMovements(movements);

  const goal = new GoalFollow(player?.entity, 2);
  bot.pathfinder.setGoal(goal, true);

  return true;
};

export const followPlayerChat = async (args: string[], username: string) => {
  const player = args[0]?.replaceAll(RegExp(`(${entitiesLocale.me.join('|')})`, 'gi'), username) ?? username;
  const { startFollow, startFollowError, alreadyDo, dontWriteMyName } = repliesLocale;

  if (player === botData.botName) {
    return replyMessage(dontWriteMyName());
  }

  if (botAction?.extraData === player) {
    return replyMessage(alreadyDo());
  }

  await endAllActions();
  const isSuccess = await followPlayer(player);
  if (isSuccess) {
    replyMessage(startFollow(player));
  } else {
    replyMessage(startFollowError());
  }
};

export const unfollowPlayer = async () => {
  bot.pathfinder.stop();
  await endAction('follow');
};

export const unfollowPlayerChat = async () => {
  const { unfollow } = repliesLocale;

  if (botAction.type === 'follow') {
    replyMessage(unfollow(botAction.extraData));
    await unfollowPlayer();
  }
};
