import { moveToPos } from '../move/index.js';
import { bot, botData, continueAction } from '../bot/index.js';

// остановка атаки
//@ts-ignore
bot.on('stoppedAttacking', async () => {
  const isContinue = await continueAction();

  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
});
