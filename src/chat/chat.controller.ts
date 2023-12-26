import { replyMessage } from '../common';
import { botName } from '../../config';
import { bot } from '../bot';
import { chatCommandsHandler } from './chat.service';

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
