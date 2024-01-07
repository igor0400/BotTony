import { bot } from '../bot/index.js';
import { setIsGoalReached } from './move.service.js';

bot.on('goal_reached', () => {
  setIsGoalReached(true);
});
