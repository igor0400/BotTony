import { moveToPos } from 'src/move/move.service.js';
import { bot, botData, continueAction } from '../bot/index.js';

// остановка атаки
//@ts-ignore
bot.on('stoppedAttacking', async () => {
  console.log('stoppedAttacking');

  const isContinue = await continueAction();

  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
});
//@ts-ignore
bot.on('startedAttacking', () => {
  console.log('startedAttacking');
});
//@ts-ignore
bot.on('attackedTarget', () => {
  console.log('attackedTarget');
});
