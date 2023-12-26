import { bot } from '../bot';
import { checkInventoryFood } from './health.service';

bot.once('spawn', () => {
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 14,
    bannedFood: ['golden_apple', 'enchanted_golden_apple', 'rotten_flesh', 'poisonous_potato', 'pufferfish'],
    eatingTimeout: 3000,
    ignoreInventoryCheck: false,
    checkOnItemPickup: true,
    offhand: false,
    equipOldItem: true,
  };
});

bot.on('health', () => {
  if (bot.food === 19) {
    checkInventoryFood();
  }

  if (bot.food === 20) {
    bot.autoEat.disable();
  } else {
    bot.autoEat.enable();
  }

  if (Math.floor(bot.health) === 6) {
    bot.chat('У меня осталось 3 хп');
  }
});
