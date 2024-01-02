import { getPlayer } from '../common/index.js';
import { bot, takeInventoryItem } from '../bot/index.js';

export const attackEntity = (entity: any) => {
  if (entity) {
    takeInventoryItem('sword');
    bot.pvp.attack(entity);
  }
};

export const stopAttack = () => {
  bot.pvp.stop();
};

export const attakPlayer = (playerName: string) => {
  const player = getPlayer(playerName);
  attackEntity(player?.entity);
};
