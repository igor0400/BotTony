import { lookToNearPlayer } from './bot.service.js';
import { botAction, botData, continueAction } from './assets/index.js';
import { bot } from './init.js';
import { moveToPos } from '../move/index.js';

bot.on('physicsTick', async () => {
  const validActions = ['follow', 'guard'];

  if (!botAction?.type || validActions.includes(botAction?.type)) {
    await lookToNearPlayer();
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
