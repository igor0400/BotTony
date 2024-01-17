import { moveToPos } from '../move/index.js';
import { bot, botData } from '../bot/index.js';
import { continueAction } from '../continue/index.js';

// остановка атаки
//@ts-ignore
bot.on('stoppedAttacking', async () => {
  const isContinue = await continueAction();

  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
});
