import { replyMessage } from '../common/index.js';
import { botName } from '../../config.js';
import { bot } from '../bot/index.js';
import { chatCommandsHandler } from './chat.service.js';

bot.on('chat', async (username: string, message: string) => {
  if (username === bot.username) return;

  const clearMessage = message.replaceAll(/\.|,|\?|!|-/g, '').trim();
  const args = clearMessage.split(' ').filter((i) => i.trim());

  if (args[0]?.toLowerCase() === botName.toLowerCase()) {
    const clearArgs = args.slice(1);
    if (clearArgs.length) {
      await chatCommandsHandler(username, clearArgs);
    } else {
      replyMessage('Слушаю');
    }
  }
});