import { bot } from '../bot/index.js';
import { takeMainItems } from './collect.service.js';

bot.on('playerCollect', (collector) => {
  if (collector === bot.entity) {
    takeMainItems();
  }
});

// bot.on('itemDrop', (item) => {
//    if (item.position.distanceTo(bot.entity.position) < 10 && collecting) {
//       collecting = false;
//       moveToPos(item.position);
//    }
// });
