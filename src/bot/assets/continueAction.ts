import { repliesLocale } from '../../locale/index.js';
import { replyMessage } from '../../common/index.js';
import { followPlayer } from '../../move/index.js';
import { getFirstAction } from '../database/index.js';
import { endAction } from './endAction.js';
import { changeBotAction } from './botState.js';

export const continueAction = async () => {
  const firstAction = await getFirstAction();

  if (firstAction) {
    const { type, extraData } = firstAction;
    const { continueFollow, continueFollowError } = repliesLocale;
    changeBotAction(firstAction);

    if (type === 'follow') {
      const isSuccess = await followPlayer(extraData, false);
      if (isSuccess) {
        replyMessage(continueFollow(extraData));
      } else {
        await endAction('follow');
        replyMessage(continueFollowError(extraData));
      }
      return;
    }
  }
};
