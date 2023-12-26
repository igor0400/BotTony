import { bot } from '../bot';
import { takeMainItems } from './collect.service';

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
