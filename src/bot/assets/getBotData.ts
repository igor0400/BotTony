import { getBotDataByVals } from '../database';
import { botHost, botPort, ownerName } from '../../../config';

export const getBotData = async () => {
  const data = await getBotDataByVals({ serverHost: botHost, serverPort: botPort, ownerName });

  return data;
};
