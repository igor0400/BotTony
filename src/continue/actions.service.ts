import { changeBotAction, getFirstAction } from '../bot/index.js';
import { continueActionsFuncs } from './configs/index.js';

export const continueAction = async (isStart = false) => {
  const firstAction = await getFirstAction();

  if (firstAction) {
    const { type, extraData } = firstAction;

    changeBotAction(firstAction);

    const continueFunc = continueActionsFuncs[type];

    if (continueFunc) {
      return await continueFunc(extraData, isStart);
    }
  }
};
