import { customRequest, getId } from '../../common';
import { BotCreationArgs, BotModel } from '../types/bot.model';

export const createBot = async ({ serverHost, serverPort, ownerName }: BotCreationArgs) => {
  const data = await customRequest(
    `INSERT INTO bots (id, serverHost, serverPort, ownerName) VALUES ("${getId()}", "${serverHost}", "${serverPort}", "${ownerName}")`,
  );

  return data;
};

export const updateBotHomeCords = async ({ id, cords }: { id: string; cords: string }) => {
  const data = await customRequest(`UPDATE bots SET homeCords = "${cords}" WHERE id = "${id}"`);

  return data;
};

export const getBotDataByVals = async ({ serverHost, serverPort, ownerName }: Omit<BotCreationArgs, 'botName'>) => {
  const data = await customRequest(
    `SELECT * FROM bots WHERE serverHost = "${serverHost}" AND serverPort = "${serverPort}" AND ownerName = "${ownerName}"`,
  );

  return data[0] as BotModel;
};
