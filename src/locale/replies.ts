import { CordsType } from '../common/index.js';
import { lang } from '../../config.js';
import { getRandomMess } from './assets/index.js';

const replies = {
  ru: {
    hello: (botName: string) => `Всем привет, я ${botName}`,
    helloPlayer: (player: string) => `Привет, ${player}!`,
    byePlayer: (player: string) => `Прощай, ${player} :(`,
    continueFollow: (player: string) => `Продолжаю следовать за ${player}`,
    continueFollowError: (player: string) => `Я не смог продолжить следовать за ${player}`,
    newSethome: () => 'Я запомнил новую точку дома!',
    badCommand: () => 'Я не знаю такой команды',
    listening: () => getRandomMess(['Слушаю', 'Да да', 'Я тут!', 'Это я', 'Готов помочь!']),
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
    alreadyDo: () => 'Я уже делаю это!',
    dontWriteMyName: () => 'Ты указал моё имя!',
    notFoundPlayer: () => 'Я не вижу игрока',
    startKill: () => 'Тебе хана!',
    dontKill: () => 'Ладно, живи',
    stop: () => 'Хорошо',
    continueFight: (player: string) => `Это не конец, ${player}!`,
    continueFightError: (player: string) => `Я не смогу одолеть ${player}`,
    killedPlayer: (player: string) => `${player} повержен`,
    startGuardHome: () => 'Теперь я охраняю точку дома',
    startGuardPlayer: (player: string) => `Теперь я охраняю ${player}`,
    endGuardHome: () => 'Я больше не охраняю точку дома',
    endGuardPlayer: (player: string) => `Я больше не охраняю ${player}`,
    startGuardError: () => 'Укажи кого или что охранять',
    continueGuardPlayer: (player: string) => `Продолжаю охранять ${player}`,
    continueGuardPlayerError: (player: string) => `Не могу продолжить охранять ${player}`,
    continueGuardHome: () => 'Продолжаю охранять точку дома',
    continueGuardHomeError: () => 'Не могу продолжить охранять точку дома',
    myCords: (cords: CordsType) => `Мои координаты: ${cords.x} ${cords.y} ${cords.z}`,
    playerCords: (playerName: string, cords: CordsType) => `Координаты ${playerName}: ${cords.x} ${cords.y} ${cords.z}`,
    whereBadArgs: () => 'Укажи ник игрока',
    lessItems: (count: number | string) => `У меня только ${count}`,
    iInPosition: () => 'Я на месте',
    playerAway: () => 'Игрок слишком далеко',
    continueGo: (cords: CordsType) => `Продолжаю идти на координаты: ${cords.x} ${cords.y} ${cords.z}`,
    startGeave: () => 'Уже несу!',
    continueGeave: (item: string, player: string) => `Продолжаю нести ${item} ${player}`,
    notFoundItem: () => 'У меня этого нет',
    endGeave: () => getRandomMess(['Пожалуйста', 'Готово']),
    badComeAndGeaveArgs: (type: 'all' | 'who' | 'what' = 'all') =>
      type === 'who'
        ? 'Я не понимаю кому нести'
        : type === 'what'
        ? 'Я не понимаю что нести'
        : 'Я не понимаю кому и что нести',
    wentForResources: () => 'Я за ресурсами',
  },
  en: {
    hello: (botName: string) => `Hi, everybody, I'm ${botName}`,
    helloPlayer: (player: string) => `Hi, ${player}!`,
    byePlayer: (player: string) => `Goodbye, ${player} :(`,
    continueFollow: (player: string) => `I continue to follow ${player}`,
    continueFollowError: (player: string) => `I couldn't continue to follow ${player}`,
    newSethome: () => "I've memorized the new house point!",
    badCommand: () => "I don't know this command",
    listening: () => getRandomMess(["I'm listening", "I'm here!", "I'm ready to help!"]),
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
    alreadyDo: () => "I'm already doing it!",
    dontWriteMyName: () => 'You wrote my name!',
    notFoundPlayer: () => "I don't see the player",
    startKill: () => "You're screwed!",
    dontKill: () => 'All right, live',
    stop: () => 'Okay',
    continueFight: (player: string) => `It's not the end, ${player}!`,
    continueFightError: (player: string) => `I can't beat ${player}`,
    killedPlayer: (player: string) => `${player} is defeated`,
    startGuardHome: () => "Now I'm guarding the point of the house",
    startGuardPlayer: (player: string) => `Now I'm guarding ${player}`,
    endGuardHome: () => "I'm no longer guarding the point of the house",
    endGuardPlayer: (player: string) => `I'm no longer guarding ${player}`,
    startGuardError: () => 'Specify who or what to protect',
    continueGuardPlayer: (player: string) => `I'm still guarding ${player}`,
    continueGuardPlayerError: (player: string) => `I can't keep guarding ${player}`,
    continueGuardHome: () => 'Continuing to guard the point of the house',
    continueGuardHomeError: () => "Can't continue to guard the point of the house",
    myCords: (cords: CordsType) => `My coordinates: ${cords.x} ${cords.y} ${cords.z}`,
    playerCords: (playerName: string, cords: CordsType) =>
      `${playerName}'s coordinates: ${cords.x} ${cords.y} ${cords.z}`,
    whereBadArgs: () => "Enter the player's nickname",
    lessItems: (count: number | string) => `I have only ${count}`,
    iInPosition: () => "I'm in position",
    playerAway: () => 'The player is too far away',
    continueGo: (cords: CordsType) => `Continuing to go to coordinates: ${cords.x} ${cords.y} ${cords.z}`,
    startGeave: () => "I'm on it!",
    continueGeave: (item: string, player: string) => `I continue to carry ${item} ${player}`,
    notFoundItem: () => "I don't have it",
    endGeave: () => 'As asked',
    badComeAndGeaveArgs: (type: 'all' | 'who' | 'what' = 'all') =>
      type === 'who'
        ? "I don't understand who to bring"
        : type === 'what'
        ? "I don't understand what to carry"
        : "I don't understand who to give what to",
    wentForResources: () => 'I went for resources',
  },
};

export const repliesLocale = replies[lang] ?? replies.ru;
