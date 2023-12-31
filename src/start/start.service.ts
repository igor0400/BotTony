import minecraftData from 'minecraft-data';
import { bot, setHomePos, botData, continueAction } from '../bot/index.js';
import { botChatName, repliesLocale } from '../locale/index.js';

export let mcData;

export const onInit = async () => {
  mcData = minecraftData(bot.version);
  const { hello } = repliesLocale;

  bot.chat(hello(botChatName));

  if (!botData.homeCords) {
    await setHomePos(bot?.entity?.position?.floored());
  }

  await continueAction();
};
