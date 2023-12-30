import { getBotDataByVals } from '../database/index.js';
import { botHost, botPort, ownerName } from '../../../config.js';

export const getBotData = async () => {
  const data = await getBotDataByVals({ serverHost: botHost, serverPort: botPort, ownerName });

  return data;
};
