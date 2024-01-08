import { repliesLocale } from '../locale/index.js';
import { botData, continueAction, endAction, getNearestItem } from '../bot/index.js';
import { CordsType, replyMessage } from '../common/index.js';
import { moveToPos, moveToPosPromise } from '../move/index.js';

export const reclaimResources = async (deadCords: CordsType) => {
  const { wentForResources } = repliesLocale;

  replyMessage(wentForResources());
  await moveToPosPromise(deadCords);

  let nearestItem = getNearestItem();

  while (nearestItem) {
    await moveToPosPromise(nearestItem.position);
    nearestItem = getNearestItem();
  }

  await endAction('reclaim_resources');
  const isContinue = await continueAction(true);
  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
};
