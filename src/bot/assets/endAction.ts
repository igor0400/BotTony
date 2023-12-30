import { deleteActionByType, deleteAllActions } from '../database/index.js';

export const endAction = async (type: string) => {
  await deleteActionByType(type);
};

export const endAllActions = async () => {
  await deleteAllActions();
};
