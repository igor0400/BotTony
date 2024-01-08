import { bot, createAction } from '../bot/index.js';
import { botName } from '../../config.js';

bot.on('entityDead', async (entity) => {
  if (entity.username === botName) {
    await createAction({ type: 'reclaim_resources', extraData: JSON.stringify(entity?.position?.floored()) });
  }
});
