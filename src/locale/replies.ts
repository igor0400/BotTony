import { lang } from '../../config.js';

const replies = {
  ru: {
    hello: (botName: string) => `Всем привет, я ${botName}`,
    continueFollow: (player: string) => `Продолжаю следовать за ${player}`,
    continueFollowError: (player: string) => `Я не смог продолжить следовать за ${player}`,
    newSethome: () => 'Я запомнил новую точку дома!',
    badCommand: () => 'Я не знаю такой команды',
    listening: () => 'Слушаю',
    outFood: () => 'У меня закончилась еда!',
    nullGoArgs: () => 'Укажи куда идти! Могу на точку дома, к игроку или на координаты x y z',
    farPlayer: () => 'Ты слишком далеко, я тебя не вижу, напиши координаты в формате x y z',
    nullCords: () => 'Мне нужны координаты в формате x y z, ник игрока или точка дома',
    badCords: () => 'Неверно указаны координаты',
    alreadyHere: () => 'Я уже тут!',
    alreadyRun: () => 'Уже бегу!',
    startFollow: (player: string) => `Теперь я следую за ${player}`,
    startFollowError: () => 'Не понимаю за кем следовать',
    unfollow: (player: string) => `Я больше не следую за ${player}`,
    haveOnlyHp: (count: number) => `У меня осталось ${count} хп`,
  },
  en: {
    hello: (botName: string) => `Hi, everybody, I'm ${botName}`,
    continueFollow: (player: string) => `I continue to follow ${player}`,
    continueFollowError: (player: string) => `I couldn't continue to follow ${player}`,
    newSethome: () => "I've memorized the new house point!",
    badCommand: () => "I don't know this command",
    listening: () => "I'm listening",
    outFood: () => "I'm out of food!",
    nullGoArgs: () => 'Point where to go! I can go to a house point, to a player, or to x y z coordinates',
    farPlayer: () => "You're too far away, I can't see you, write the coordinates in x y z format",
    nullCords: () => 'I need coordinates in x y z format, player nickname or house point',
    badCords: () => 'Incorrect coordinates',
    alreadyHere: () => "I'm already here!",
    alreadyRun: () => "I'm on it!",
    startFollow: (player: string) => `Now I'm following ${player}`,
    startFollowError: () => "I don't know who to follow",
    unfollow: (player: string) => `I don't follow ${player} anymore`,
    haveOnlyHp: (count: number) => `I have ${count} hp left`,
  },
};

export const repliesLocale = replies[lang] ?? replies.ru;
