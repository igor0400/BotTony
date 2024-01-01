import { lookForPlayer } from './bot.service.js';
import { botAction } from './assets/index.js';
import { bot } from './init.js';

bot.on('physicsTick', async () => {
  if (!bot.pvp.target && !bot.pathfinder.isMoving() && (!botAction?.type || botAction?.type === 'follow')) {
    await lookForPlayer();
  }
});
