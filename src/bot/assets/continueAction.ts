import { repliesLocale } from '../../locale/index.js';
import { replyMessage } from '../../common/index.js';
import { followPlayer, moveToPosPromise } from '../../move/index.js';
import { getFirstAction } from '../database/index.js';
import { endAction } from './endAction.js';
import { changeBotAction } from './botState.js';
import { fightPlayer } from '../../fight/index.js';
import { startGuarding } from '../../guard/index.js';
import { comeAndDropItems } from '../../collect/index.js';

// разделить все на отдельные файлы (continue.ts в каждой папке)

export const continueAction = async (isStart = false) => {
  const firstAction = await getFirstAction();

  if (firstAction) {
    const { type, extraData } = firstAction;
    const {
      continueFollow,
      continueFollowError,
      continueFight,
      continueFightError,
      continueGuardPlayer,
      continueGuardPlayerError,
      continueGuardHome,
      continueGuardHomeError,
      continueGo,
      iInPosition,
      continueGeave,
    } = repliesLocale;

    changeBotAction(firstAction);

    if (type === 'follow') {
      const isSuccess = await followPlayer(extraData, false);

      if (isSuccess) {
        replyMessage(continueFollow(extraData));
      } else {
        await endAction('follow');
        replyMessage(continueFollowError(extraData));
      }
      return true;
    }

    if (type === 'fight') {
      const isSuccess = await fightPlayer(extraData, false);

      if (isSuccess) {
        replyMessage(continueFight(extraData));
      } else {
        await endAction('fight');
        replyMessage(continueFightError(extraData));
      }
      return true;
    }

    if (type === 'guard') {
      const { type, name } = JSON.parse(extraData);
      const initTarget = name ? name : type;
      const isSuccess = await startGuarding(initTarget, name ?? '', false);

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
    }

    if (type === 'geave') {
      const { playerName, itemName, count } = JSON.parse(extraData);

      replyMessage(continueGeave(itemName, playerName));
      await comeAndDropItems(playerName, itemName, count);
      return true;
    }

    if (type === 'go') {
      const cords = JSON.parse(extraData);

      replyMessage(continueGo(cords));
      await moveToPosPromise(cords);
      replyMessage(iInPosition());
      await endAction('go');
      return true;
    }

    return true;
  }
};
