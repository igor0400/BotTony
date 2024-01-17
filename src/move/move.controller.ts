import { bot, endAction } from '../bot/index.js';
import { setIsGoalReached } from './move.service.js';

bot.on('goal_reached', async () => {
  setIsGoalReached(true);
  await endAction('go');
});
