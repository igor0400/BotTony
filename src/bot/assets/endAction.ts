import { deleteActionByType, deleteAllActions } from '../database/index.js';
import { bot } from '../init.js';

export const endAction = async (type: string) => {
  await deleteActionByType(type);
};

export const endAllActions = async () => {
  bot.pathfinder.stop();
  bot.pvp.stop();
  await deleteAllActions();
};
