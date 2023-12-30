import minecraftData from 'minecraft-data';
import { botName } from '../../config.js';
import { bot, setHomePos, botData, continueAction } from '../bot/index.js';

export let mcData;

export const onInit = async () => {
  mcData = minecraftData(bot.version);

  bot.chat(`Всем привет, я ${botName}`);

  if (!botData.homeCords) {
    await setHomePos(bot?.entity?.position?.floored());
  }

  await continueAction();
};
