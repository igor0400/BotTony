import { replyMessage } from '../common/index.js';
import { botName } from '../../config.js';
import { bot } from '../bot/index.js';
import { chatCommandsHandler } from './chat.service.js';
import { botNamesLocale, repliesLocale } from '../locale/index.js';
import { noReplaceLetters } from './configs/index.js';

bot.on('chat', async (username: string, message: string) => {
  if (username === bot.username) return;

  const clearMessage = message
    .match(new RegExp(`\\w|\\d|[а-яА-ЯёЁ]|\\s|${noReplaceLetters.join('|')}`, 'gi'))
    .join('')
    .trim();
  const args = clearMessage.split(' ').filter((i) => i.trim());
  const firstArg = args[0]?.toLowerCase();
  const botNames = botNamesLocale[botName.toLowerCase()];

  const { listening } = repliesLocale;

  if (botNames?.includes(firstArg)) {
    const clearArgs = args.slice(1);
    if (clearArgs.length) {
      await chatCommandsHandler(username, clearArgs);
    } else {
      replyMessage(listening());
    }
  }
});
