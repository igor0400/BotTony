import { bot } from '../../bot/index.js';

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
