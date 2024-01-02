import { bot, takeInventoryItem } from '../bot/index.js';
import { collectingFood } from './configs/index.js';

export const takeMainItems = () => {
  // взять мечь
  setTimeout(() => takeInventoryItem('sword'), 150);

  // взять щит
  setTimeout(() => takeInventoryItem('shield', 'off-hand'), 250);
};

export const checkStopCollectingFood = () => {
  let isStopCollecting = false;

  for (let foodItem of collectingFood) {
    const invItem = bot.inventory.items().find((item) => item.name.includes(foodItem));

    if (invItem?.count >= 20) {
      isStopCollecting = true;
    }
  }

  return isStopCollecting;
};

// // собирать блоки

// async function collectBlocks(args) {
//    let count = 1;
//    if (args[2]) count = parseInt(args[2]);

//    const blockType = mcData.blocksByName[args[1]];
//    if (!blockType) {
//       bot.chat('Я не знаю блоков с таким названием');
//       return;
//    }

//    const blocks = bot.findBlocks({
//       matching: blockType.id,
//       maxDistance: 64,
//       count: count,
//    });

//    if (blocks.length === 0) {
//       bot.chat('Нет таких болоков поблизости');
//       return;
//    }

//    const targets = [];
//    for (let i = 0; i < Math.min(blocks.length, count); i++) {
//       targets.push(bot.blockAt(blocks[i]));
//    }
//    bot.chat(`Иду собирать ${targets.length} ${blockType.displayName}`);

//    try {
//       collecting = blockType.displayName;
//       await bot.collectBlock.collect(targets);
//       stopCollect();
//       bot.chat('Готово');
//       moveToPos(homePos);
//       bot.chat('Я домой');
//    } catch (err) {
//       bot.chat(`Ошибка: ${err.message}`);
//       moveToPos(homePos);
//       bot.chat('Я домой');
//    }
// }

// function stopCollect() {
//    if (collecting) {
//       bot.chat(`Я больше не собираю ${collecting}`);
//       collecting = false;
//    }
// }

// // НЕ РАБОТАЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕТТТТ!!!!!!!!!!!!!!!!!!!!!!
// async function collectFood() {
//    if (!checkNeedFood()) {
//       const filter = (e) =>
//          e.type === 'mob' &&
//          e.position.distanceTo(bot.entity.position) < 100 &&
//          foodMobs.includes(e.displayName);

//       const entity = bot.nearestEntity(filter);
//       if (entity) {
//          collecting = entity.displayName;
//          bot.chat('Иду добывать еду');
//          await moveToPos(entity.position);
//          await attackSome(entity);
//          // await collectFood();
//       } else bot.chat('Я не нашёл мобов для добычи еды');
//    } else {
//       bot.chat('Еды достаточно, я домой');
//       moveToPos(homePos);
//    }
// }
