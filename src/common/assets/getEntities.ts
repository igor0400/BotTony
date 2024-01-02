import { bot } from '../../bot/index.js';

export const getPlayer = (playerName: string) => {
  if (playerName) {
    const player = bot?.players[playerName];
    return player;
  }
};
