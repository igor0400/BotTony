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
      titles: ['unfollow'],
    },
  },
  ru: {
    sethome: {
      titles: ['новыйдом'],
    },
    go: {
      titles: ['иди'],
      replaceArgs: ['к', 'ко', 'на'],
    },
    follow: {
      titles: ['следуй'],
      replaceArgs: ['за'],
    },
    unfollow: {
      titles: ['неследуй'],
    },
  },
};

export const commandsLocale = commands[lang] ?? commands.ru;

export const entities = {
  ru: {
    me: ['я', 'мне', 'меня', 'мной'],
    you: ['ты', 'тебя', 'тебе'],
  },
  en: {
    me: ['i', 'me', 'my'],
    you: ['you', 'u'],
  },
};

export const entitiesLocale = entities[lang] ?? entities.ru;
