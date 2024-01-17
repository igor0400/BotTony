import { replyMessage } from '../common/index.js';
import { repliesLocale } from '../locale/index.js';
import { comeAndDropItems } from './drop.service.js';
import { reclaimResources } from './reclaim.service.js';

export const continueGeave = async (extraData: string) => {
  const { playerName, itemName, count } = JSON.parse(extraData);

  const { continueGeave: continueGeaveMess } = repliesLocale;

  replyMessage(continueGeaveMess(itemName, playerName));
  await comeAndDropItems(playerName, itemName, count);
  return true;
};

export const continueReclaimResources = async (extraData: string) => {
  await reclaimResources(JSON.parse(extraData));
  return true;
};
