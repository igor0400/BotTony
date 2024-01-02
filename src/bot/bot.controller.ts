import { lookForPlayer } from './bot.service.js';
import { botAction, botData, continueAction } from './assets/index.js';
import { bot } from './init.js';
import { moveToPos } from '../move/index.js';

bot.on('physicsTick', async () => {
  if (!bot.pvp.target && !bot.pathfinder.isMoving() && (!botAction?.type || botAction?.type === 'follow')) {
    await lookForPlayer();
  }
});

bot.on('respawn', async () => {
  const isContinue = await continueAction();

  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
});
