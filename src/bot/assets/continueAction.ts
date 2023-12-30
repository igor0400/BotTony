import { replyMessage } from '../../common/index.js';
import { followPlayer } from '../../move/index.js';
import { getFirstAction } from '../database/index.js';
import { endAction } from './endAction.js';

export const continueAction = async () => {
  const firstAction = await getFirstAction();

  if (firstAction) {
    const { type, extraData } = firstAction;

    if (type === 'follow') {
      const isSuccess = await followPlayer(extraData, false);
      if (isSuccess) {
        replyMessage(`Продолжаю следовать за ${extraData}`);
      } else {
        await endAction('follow');
        replyMessage(`Я не смог продолжить следовать за ${extraData}`);
      }
      return;
    }
  }
};
