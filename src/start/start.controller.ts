import { bot } from '../bot/index.js';
import { onInit } from './start.service.js';

bot.once('spawn', onInit);

// отслеживание ресурспаков
bot.once('resourcePack', () => {
  bot.acceptResourcePack();
});
