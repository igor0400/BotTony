import { botHost, botPort, ownerName, botName } from '../config.js';
import { changeBotData, createBot, getBotData } from './bot/index.js';
import { startDatabase } from './common/index.js';

(async () => {
  await startDatabase();

  const data = await getBotData();
  if (data) {
    changeBotData(data);
  } else {
    await createBot({ serverHost: botHost, serverPort: botPort, ownerName, botName });
  }
})();
