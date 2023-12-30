import { bot } from '../../bot/index.js';

export const replyMessage = (text: string) => {
  setTimeout(() => {
    bot.chat(text);
  }, 400);
};
