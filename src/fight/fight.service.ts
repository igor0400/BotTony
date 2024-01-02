import { getPlayer, replyMessage } from '../common/index.js';
import { attakPlayer, stopAttack } from '../attack/index.js';
import { entitiesLocale, repliesLocale } from '../locale/index.js';

// здороваться с подключившимися и прошаться с ушедшими!!!

export const fightPlayerChat = (args: string[], username: string) => {
  const playerName = args[0]?.replaceAll(new RegExp(`(${entitiesLocale.me.join('|')})`, 'gi'), username);
  const player = getPlayer(playerName);
  const { notFoundPlayer } = repliesLocale;

  if (player) {
    // ПОМЕНЯТЬ СООБЩЕНИЕ!!!!!!!!!!!!!!!!!!!!!
    replyMessage('Тебе хана!');
    attakPlayer(playerName);
  } else {
    replyMessage(notFoundPlayer());
  }
};

export const stopFightPlayerChat = () => {
  // ПОМЕНЯТЬ СООБЩЕНИЕ!!!!!!!!!!!!!!!!!!!!!
  replyMessage('Ладно, живи');
  stopAttack();
};
