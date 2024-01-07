import { repliesLocale } from '../../locale/index.js';
import { bot } from '../../bot/index.js';
import { replyMessage } from './replyMessage.js';

export const getPlayer = (playerName: string) => {
  let player;

  if (playerName && bot?.players) {
    for (let serPayerName in bot.players) {
      if (serPayerName.toLowerCase() === playerName.toLowerCase()) {
        player = bot?.players[serPayerName];
      }
    }
  }

  return player;
};

export const getPlayerWithErrMess = (playerName: string) => {
  let player;

  if (playerName && bot?.players) {
    for (let serPayerName in bot.players) {
      if (serPayerName.toLowerCase() === playerName.toLowerCase()) {
        player = bot?.players[serPayerName];
      }
    }
  }

  const { notFoundPlayer, playerAway } = repliesLocale;

  if (!player) {
    replyMessage(notFoundPlayer());
    return false;
  }

  if (!player?.entity) {
    replyMessage(playerAway());
    return false;
  }

  return player;
};
