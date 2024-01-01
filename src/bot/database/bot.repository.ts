import { customRequest, getId } from '../../common/index.js';
import { botData, changeBotData } from '../assets/index.js';
import { BotCreationArgs, BotModel } from '../types/index.js';

export const createBot = async ({ serverHost, serverPort, ownerName, botName }: BotCreationArgs) => {
  const id = getId();
  const data = await customRequest(
    `INSERT INTO bots (id, serverHost, serverPort, ownerName, botName) VALUES ("${id}", "${serverHost}", "${serverPort}", "${ownerName}", "${botName}")`,
  );

  changeBotData({ id, serverHost, serverPort, ownerName });

  return data;
};

export const getBotDataByVals = async ({ serverHost, serverPort, ownerName }: Omit<BotCreationArgs, 'botName'>) => {
  const data = await customRequest(
    `SELECT * FROM bots WHERE serverHost = "${serverHost}" AND serverPort = "${serverPort}" AND ownerName = "${ownerName}"`,
  );

  if (data) {
    return data[0] as BotModel;
  }
};

export const updateBotHomeCords = async ({ id = botData?.id, cords }: { id?: string; cords: string }) => {
  const data = await customRequest(`UPDATE bots SET homeCords = "${cords}" WHERE id = "${id}"`);

  changeBotData({ homeCords: cords });

  return data;
};
