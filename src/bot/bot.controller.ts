import { lookForPlayer } from './bot.service.js';
import { botAction, botData, continueAction } from './assets/index.js';
import { bot } from './init.js';
import { moveToPos } from '../move/index.js';

bot.on('physicsTick', async () => {
  if (
    !bot.pvp.target &&
    !bot.pathfinder.isMoving() &&
    (!botAction?.type || botAction?.type === 'follow' || botAction?.type === 'guard')
  ) {
    await lookForPlayer();
  }
});

bot.on('respawn', () => {
  setTimeout(async () => {
    const isContinue = await continueAction(true);

    if (!isContinue) {
      moveToPos(botData?.homeCords);
    }
  }, 2000);
});
