import { botName, lang } from '../../config.js';

const botNames = {
  ru: {
    tony: ['тони'],
    lulu: ['лулу', 'лу'],
    grag: ['грэг'],
  },
  en: {
    tony: ['tony'],
    lulu: ['lulu', 'lu'],
    grag: ['grag'],
  },
};

export const botNamesLocale = botNames[lang] ?? botNames.ru;
const botFirstName = botNamesLocale[botName.toLowerCase()][0];
export const botChatName = `${botFirstName.slice(0, 1).toUpperCase()}${botFirstName.slice(1)}`;

const commands = {
  en: {
    sethome: {
      titles: ['sethome'],
    },
    go: {
      titles: ['go'],
      replaceArgs: ['to'],
    },
    follow: {
      titles: ['follow'],
      replaceArgs: ['to'],
    },
    unfollow: {
      titles: ['unfollow', 'stop follow'],
    },
    fight: {
      titles: ['fight', 'kill'],
      replaceArgs: ['with'],
    },
    stopfight: {
      titles: ['stop fight'],
    },
  },
  ru: {
    sethome: {
      titles: ['новый дом', 'запомни дом', 'поставь дом', 'установи дом'],
      replaceArgs: ['у', 'там', 'где', 'около', 'перед'],
    },
    go: {
      titles: ['иди', 'идти', 'метнись'],
      replaceArgs: ['к', 'ко', 'на'],
    },
    follow: {
      titles: ['следуй'],
      replaceArgs: ['за'],
    },
    unfollow: {
      titles: ['не следуй', 'хватит следовать', 'закончи следовать'],
    },
    fight: {
      titles: ['убей', 'замочи', 'напади'],
      replaceArgs: ['на'],
    },
    stopfight: {
      titles: ['не убивай', 'хватит убивать', 'пощади'],
    },
  },
};

export const commandsLocale = commands[lang] ?? commands.ru;

export const entities = {
  ru: {
    me: ['я', 'мне', 'меня', 'мной'],
    you: ['ты', 'тебя', 'тебе', 'себе', 'себя'],
    home: ['дом', 'домой', 'дома', 'хом', 'хоум'],
  },
  en: {
    me: ['i', 'me', 'my'],
    you: ['you', 'u'],
    home: ['home'],
  },
};

export const entitiesLocale = entities[lang] ?? entities.ru;
