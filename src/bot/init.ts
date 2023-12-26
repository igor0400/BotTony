import * as mineflayer from 'mineflayer';
import { plugin as pvp } from 'mineflayer-pvp';
import { botHost, botPort, botName, ownerName } from '../../config';
import * as armourManager from 'mineflayer-armor-manager';
import { pathfinder } from 'mineflayer-pathfinder';
import { plugin as autoeat } from 'mineflayer-auto-eat';
import { plugin as collectBlock } from 'mineflayer-collectblock';
import { BotModel } from './types';
import { getId, parseCords } from '../common';
import { getBotData } from './assets';

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
  isFollow: false,
  isGuarding: false,
  isCollecting: false,
};

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

(async () => {
  const data = await getBotData();
  if (data) {
    changeBotData(data);
  }
})();

bot.loadPlugin(pvp);
bot.loadPlugin(armourManager);
bot.loadPlugin(pathfinder);
bot.loadPlugin(autoeat);
bot.loadPlugin(collectBlock);
