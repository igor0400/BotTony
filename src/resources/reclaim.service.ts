import { repliesLocale } from '../locale/index.js';
import { botData, endAction, getNearestItem } from '../bot/index.js';
import { CordsType, replyMessage } from '../common/index.js';
import { moveToPos } from '../move/index.js';
import { continueAction } from '../continue/index.js';

export const reclaimResources = async (deadCords: CordsType) => {
  const { wentForResources } = repliesLocale;

  replyMessage(wentForResources());
  await moveToPos(deadCords);

  let nearestItem = getNearestItem();

  while (nearestItem) {
    await moveToPos(nearestItem.position);
    nearestItem = getNearestItem();
  }

  await endAction('reclaim_resources');
  const isContinue = await continueAction(true);
  if (!isContinue) {
    moveToPos(botData?.homeCords);
  }
};
