import { replyMessage } from '../common/index.js';
import { moveToPos } from './move.service.js';
import { repliesLocale } from '../locale/index.js';
import { followPlayer } from './follow.service.js';
import { endAction } from '../bot/index.js';

export const continueGo = async (extraData: string) => {
  const cords = JSON.parse(extraData);

  const { continueGo: continueGoMess, iInPosition } = repliesLocale;

  replyMessage(continueGoMess(cords));
  await moveToPos(cords);
  replyMessage(iInPosition());
  return true;
};

export const continueFollow = async (extraData: string) => {
  const isSuccess = await followPlayer(extraData, false);

  const { continueFollow, continueFollowError } = repliesLocale;

  if (isSuccess) {
    replyMessage(continueFollow(extraData));
  } else {
    await endAction('follow');
    replyMessage(continueFollowError(extraData));
  }
  return true;
};
