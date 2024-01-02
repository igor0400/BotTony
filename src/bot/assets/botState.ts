import { getId, parseCords } from '../../common/index.js';
import { ActionCreationArgs, BotModel } from '../types/index.js';
import { botHost, botPort, ownerName, botName, lang } from '../../../config.js';

export const botData: BotModel = {
  id: getId(),
  serverHost: botHost,
  serverPort: botPort,
  ownerName,
  botName,
  lang,
};

export const changeBotData = (opts: object) => {
  for (let value in opts) {
    if (value === 'homeCords') {
      if (typeof opts[value] === 'string') {
        botData[value] = parseCords(opts[value]);
      }
    } else {
      botData[value] = opts[value];
    }
  }
};

export const botAction: ActionCreationArgs = {
  type: null,
};

export const changeBotAction = (opts?: object) => {
  if (opts) {
    for (let value in opts) {
      botAction[value] = opts[value];
    }
  } else {
    for (let value in botAction) {
      botAction[value] = null;
    }
  }
};
