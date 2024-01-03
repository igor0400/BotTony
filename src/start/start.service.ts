import minecraftData from 'minecraft-data';
import { bot, setHomePos, botData, continueAction } from '../bot/index.js';
import { botChatName, repliesLocale } from '../locale/index.js';

export let mcData;
export let isBotInited = false;

export const onInit = async () => {
  mcData = minecraftData(bot.version);
  isBotInited = true;

  const { hello } = repliesLocale;

  bot.chat(hello(botChatName));

  if (!botData.homeCords) {
    await setHomePos(bot?.entity?.position?.floored());
  }

  await continueAction();
};

export const onRespawn = () => {
  mcData = minecraftData(bot.version);
};
