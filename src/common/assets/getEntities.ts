import { bot } from '../../bot/index.js';

export const getPlayer = (playerName: string) => {
  const player = bot?.players[playerName];
  return player;
};
