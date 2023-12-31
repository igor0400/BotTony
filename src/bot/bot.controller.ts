import { lookForPlayer } from './bot.service.js';
import { bot, botAction } from './init.js';

bot.on('physicsTick', async () => {
  if (!bot.pvp.target && !bot.pathfinder.isMoving() && (!botAction || botAction.value?.type === 'follow')) {
    await lookForPlayer();
  }
});
