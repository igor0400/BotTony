import { customRequest, getId } from '../../common/index.js';
import { changeBotAction } from '../assets/index.js';
import { botData } from '../assets/index.js';
import { ActionCreationArgs, ActionModel } from '../types/index.js';

export const createAction = async ({ botId = botData?.id, type, extraData }: ActionCreationArgs) => {
  await incActionsExecNums();

  const id = getId();
  const data = await customRequest(
    `INSERT INTO actions (id, botId, type, extraData) VALUES ("${id}", "${botId}", "${type}", '${extraData}')`,
  );

  changeBotAction({ botId, type, extraData });

  return data;
};

export const getActionById = async (id: string) => {
  const data = await customRequest(`SELECT * FROM actions WHERE id = "${id}"`);

  if (data) {
    return data[0] as ActionModel;
  }
};

export const getFirstAction = async () => {
  const data = await customRequest(`SELECT * FROM actions WHERE execNumber = 1`);

  if (data) {
    return data[0] as ActionModel;
  }
};

export const deleteActionById = async (id: string) => {
  const data = await customRequest(`DELETE FROM actions WHERE id = "${id}"`);

  changeBotAction();
  await decActionsExecNums();

  return data;
};

export const getActionByType = async (type: string) => {
  const data = await customRequest(`SELECT * FROM actions WHERE type = "${type}" AND botId = "${botData?.id}"`);

  if (data) {
    return data[0] as ActionModel;
  }
};

export const deleteActionByType = async (type: string) => {
  const data = await customRequest(`DELETE FROM actions WHERE type = "${type}" AND botId = "${botData?.id}"`);

  changeBotAction();
  await decActionsExecNums();

  return data;
};

export const deleteAllActions = async () => {
  const data = await customRequest(`DELETE FROM actions`);

  changeBotAction();

  return data;
};

export const decActionsExecNums = async () => {
  const data = await customRequest(`UPDATE actions SET execNumber = execNumber - 1 WHERE botId = "${botData?.id}"`);

  return data;
};

export const incActionsExecNums = async () => {
  const data = await customRequest(`UPDATE actions SET execNumber = execNumber + 1 WHERE botId = "${botData?.id}"`);

  return data;
};
