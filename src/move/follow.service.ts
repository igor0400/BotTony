import mineflayerPathfinder from 'mineflayer-pathfinder';
import { getPlayer, replyMessage } from '../common/index.js';
import { bot, botAction, botData, createAction, endAction, endAllActions } from '../bot/index.js';
import { changeMeOnText, repliesLocale } from '../locale/index.js';
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
  const playerName = changeMeOnText(args[0], username) ?? username;
  const player = getPlayer(playerName);
  const { startFollow, startFollowError, alreadyDo, dontWriteMyName, playerAway } = repliesLocale;

  if (playerName === botData.botName) {
    return replyMessage(dontWriteMyName());
  }

  if (botAction?.extraData === playerName) {
    return replyMessage(alreadyDo());
  }

  await endAllActions();
  const isSuccess = await followPlayer(playerName);
  if (isSuccess) {
    replyMessage(startFollow(playerName));
  } else {
    if (player && !player?.entity) {
      replyMessage(playerAway());
    } else {
      replyMessage(startFollowError());
    }
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
