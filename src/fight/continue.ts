import { replyMessage } from '../common/index.js';
import { fightPlayer } from './fight.service.js';
import { repliesLocale } from '../locale/index.js';
import { endAction } from '../bot/index.js';

export const continueFight = async (extraData: string) => {
  const isSuccess = await fightPlayer(extraData, false);

  const { continueFight, continueFightError } = repliesLocale;

  if (isSuccess) {
    replyMessage(continueFight(extraData));
  } else {
    await endAction('fight');
    replyMessage(continueFightError(extraData));
  }
  return true;
};
