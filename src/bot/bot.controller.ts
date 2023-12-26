import { lookForPlayer } from './bot.service';
import { bot, botData } from './init';

bot.on('physicsTick', async () => {
  if (!bot.pvp.target && !bot.pathfinder.isMoving() && !botData?.isCollecting) {
    await lookForPlayer();
  }
});
