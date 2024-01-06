import { getPlayer, replyMessage } from '../common/index.js';
import { bot, getInventoryItem, takeInventoryItem } from '../bot/index.js';
import { collectingFood } from './configs/index.js';
import { changeMeOnText, repliesLocale } from '../locale/index.js';

export const takeMainItems = () => {
  // взять мечь
  setTimeout(() => takeInventoryItem('sword'), 150);

  // взять щит
  setTimeout(() => takeInventoryItem('shield', 'off-hand'), 250);
};

// подходить и выбрасывать предметы челу
// сделать отдельно функцию подходить и выбратывать
// и отдельно для чата
// скидывать, и писать у меня есть только (кол-во), если не хватает ресов

export const dropItems = (itemName: string, count?: number) => {
  const { lessItems } = repliesLocale;

  const item = getInventoryItem(itemName);
  console.log('item:', item);

  if (!item) {
    return replyMessage('У МЕНЯ НЕТ ЭТОГО');
  }

  if (count !== undefined && item?.count < count) {
    replyMessage(lessItems(item?.count));
  }

  if (count) {
    bot.toss(item.type, item.metadata, count);
  }
};

export const comeAndDropItems = (playerName: string, itemName: string, count?: number) => {
  dropItems('cooked_beef');
};

export const comeAndDropItemsChat = (args: string[], username: string) => {
  const data = getCADIDataByArgs(args, username);

  if (!data) return;

  console.log('data:', data);

  const { playerName, itemName, count } = data;

  comeAndDropItems(playerName, itemName, count);
};

function getCADIDataByArgs(args: string[], username: string) {
  let playerName: string;
  let itemName: string;
  let count: number;

  let secondArgsStartNum = 0;

  if (args.length < 2) {
    replyMessage('ПЕРЕДАТЬ ПРАВИЛЬНЫЕ АРГУМЕНТЫ');
    return false;
  }

  if (args.length >= 3) {
    const firstPlayerName = changeMeOnText(args[0], username);
    const isFirstPlayer = getPlayer(firstPlayerName);

    if (isFirstPlayer) {
      playerName = firstPlayerName;
      secondArgsStartNum = 1;
    } else {
      const secondPlayerName = changeMeOnText(args[2], username);
      const isSecondPlayer = getPlayer(secondPlayerName);

      if (isSecondPlayer) {
        playerName = secondPlayerName;
      }
    }
  }

  if (+args[secondArgsStartNum]) {
    count = +args[secondArgsStartNum];
    itemName = args[secondArgsStartNum + 1];
  } else {
    count = +args[secondArgsStartNum + 1];
    itemName = args[secondArgsStartNum];
  }

  return { playerName, itemName, count };
}

// подходить и складывать ресы в сундук, если его там нет, ставить, если нет ресов на сундук сказать

// export const checkStopCollectingFood = () => {
//   let isStopCollecting = false;

//   for (let foodItem of collectingFood) {
//     const invItem = bot.inventory.items().find((item) => item.name.includes(foodItem));

//     if (invItem?.count >= 20) {
//       isStopCollecting = true;
//     }
//   }

//   return isStopCollecting;
// };

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
