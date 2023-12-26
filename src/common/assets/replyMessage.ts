import { bot } from '../../bot';

export const replyMessage = (text: string) => {
  setTimeout(() => {
    bot.chat(text);
  }, 400);
};
