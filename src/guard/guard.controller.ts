import { bot } from '../bot/index.js';
import { onGuarding } from './guard.service.js';

// атаковать ближайших мобов
bot.on('physicsTick', onGuarding);
