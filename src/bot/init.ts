import * as mineflayer from 'mineflayer';
import { plugin as pvp } from 'mineflayer-pvp';
import { botHost, botPort, botName } from '../../config';
import * as armourManager from 'mineflayer-armor-manager';
import { pathfinder } from 'mineflayer-pathfinder';
import { plugin as autoeat } from 'mineflayer-auto-eat';
import { plugin as collectBlock } from 'mineflayer-collectblock';

if (!botHost || !botPort) {
  throw new Error('Передайте значения BOT_HOST и BOT_PORT');
}

export const bot = mineflayer.createBot({
  host: botHost,
  port: botPort,
  username: botName,
  logErrors: false,
  // version: false,
  // auth: 'mojang'
});

bot.loadPlugin(pvp);
bot.loadPlugin(armourManager);
bot.loadPlugin(pathfinder);
bot.loadPlugin(autoeat);
bot.loadPlugin(collectBlock);
