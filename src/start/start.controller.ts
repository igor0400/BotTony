import { bot } from '../bot';
import { onInit } from './start.service';

bot.once('spawn', onInit);

// отслеживание ресурспаков
bot.once('resourcePack', () => {
  bot.acceptResourcePack();
});
