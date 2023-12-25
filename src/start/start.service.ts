import { botName } from '../../config';
import { bot, setHomePos, getBotData } from '../bot';
import * as minecraftData from 'minecraft-data';

export let mcData;

export const onInit = async () => {
  mcData = minecraftData(bot.version);

  bot.chat(`Всем привет, я ${botName}`);
  const botData = await getBotData();

  if (!botData.homeCords) {
    const { x, y, z } = bot.entity.position;

    await setHomePos({ x: Math.floor(x), y: Math.floor(y), z: Math.floor(z) });
  }
};
