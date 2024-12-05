import { repliesLocale } from '../locale/index.js';
import { bot } from '../bot/index.js';
import { checkInventoryFood } from './health.service.js';

bot.once('spawn', () => {
  bot.autoEat.options = {
    priority: 'foodPoints',
    startAt: 14,
    bannedFood: [1], // 'golden_apple', 'enchanted_golden_apple', 'rotten_flesh', 'poisonous_potato', 'pufferfish'
    eatingTimeout: 3000,
    ignoreInventoryCheck: false,
    checkOnItemPickup: true,
    offhand: false,
    equipOldItem: true,
    healthThreshold: 10,
  };
});

bot.on('health', () => {
  const { haveOnlyHp } = repliesLocale;

  if (bot.food === 19) {
    checkInventoryFood();
  }

  if (bot.food === 20) {
    bot.autoEat.disable();
  } else {
    bot.autoEat.enable();
  }

  if (Math.floor(bot.health) === 6) {
    bot.chat(haveOnlyHp(3));
  }
});
