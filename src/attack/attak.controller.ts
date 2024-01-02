import { moveToPos } from 'src/move/move.service.js';
import { bot, botData, continueAction } from '../bot/index.js';

// остановка атаки
//@ts-ignore
bot.on('stoppedAttacking', async () => {
  console.log('stopped attak');

  const isContinue = await continueAction();

  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
});
