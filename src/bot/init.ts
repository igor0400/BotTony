import * as mineflayer from 'mineflayer';
import { plugin as pvp } from 'mineflayer-pvp';
import armourManager from 'mineflayer-armor-manager';
import { pathfinder } from 'mineflayer-pathfinder';
import { plugin as autoeat } from 'mineflayer-auto-eat';
import { plugin as collectBlock } from 'mineflayer-collectblock';
import { botHost, botPort, botName, ownerName } from '../../config.js';
import { ActionCreationArgs, BotModel } from './types/index.js';
import { getId, parseCords } from '../common/index.js';

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

export const botData: BotModel = {
  id: getId(),
  serverHost: botHost,
  serverPort: botPort,
  ownerName,
  botName,
  lang: 'ru',
};

export let botAction: ActionCreationArgs | null = null;

export const changeBotData = (opts: object) => {
  for (const value in opts) {
    if (value === 'homeCords') {
      if (typeof opts[value] === 'string') {
        botData[value] = parseCords(opts[value]);
      }
    } else {
      botData[value] = opts[value];
    }
  }
};

export const changeBotAction = (action: ActionCreationArgs | null) => {
  botAction = action;
};

bot.loadPlugin(pvp);
bot.loadPlugin(armourManager);
bot.loadPlugin(pathfinder);
bot.loadPlugin(autoeat);
bot.loadPlugin(collectBlock);
