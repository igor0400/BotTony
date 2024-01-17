import { replyMessage } from '../common/index.js';
import { repliesLocale } from '../locale/index.js';
import { endAction } from '../bot/index.js';
import { startGuarding } from './guard.service.js';

export const continueGuard = async (extraData: string, isStart: boolean) => {
  const { type, name } = JSON.parse(extraData);
  const isSuccess = await startGuarding(name ?? '', false);

  const { continueGuardPlayer, continueGuardPlayerError, continueGuardHome, continueGuardHomeError } = repliesLocale;

  if (isStart) {
    if (isSuccess) {
      if (type === 'player') {
        replyMessage(continueGuardPlayer(name));
      } else {
        replyMessage(continueGuardHome());
      }
    } else {
      await endAction('guard');
      if (type === 'player') {
        replyMessage(continueGuardPlayerError(name));
      } else {
        replyMessage(continueGuardHomeError());
      }
    }
  }

  return true;
};
