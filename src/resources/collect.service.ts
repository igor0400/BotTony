import { mcData } from '../start/index.js';
import {
  bot,
  botAction,
  botData,
  createAction,
  endAction,
  getInventoryItems,
  getItemNamesByChatName,
  takeInventoryItem,
} from '../bot/index.js';
import { collectingFood } from './configs/index.js';
import { moveToPos } from '../move/index.js';
import { replyMessage } from '../common/index.js';

export const takeMainItems = () => {
  // взять оружие
  setTimeout(() => {
    const isSword = takeInventoryItem('sword');
    if (!isSword) takeInventoryItem('axe');
  }, 150);
  // взять щит
  setTimeout(() => takeInventoryItem('shield', 'off-hand'), 250);
};

// перевести сообщения
// сделать continue

// собирать ресы и если надо складывать в сундук, если его там нет -> ставить, если нет ресов на сундук -> нарубить

export const collectBlocks = async (itemChatName: string, count = 1) => {
  const itemNames = getItemNamesByChatName(itemChatName);

  // если это еда, вызывать collectFood

  const blocksTypes = [];

  for (let blockName in mcData.blocksByName) {
    for (let itemName of itemNames) {
      if (blockName.includes(itemName)) {
        blocksTypes.push(mcData.blocksByName[blockName]);
      }
    }
  }

  if (!blocksTypes.length) {
    replyMessage('Я не знаю блоков с таким названием');
    return;
  }

  const blocksCords = [];

  for (let blockType of blocksTypes) {
    blocksCords.push(
      ...bot.findBlocks({
        matching: blockType.id,
        maxDistance: 64,
        count: count,
      }),
    );
  }

  if (!blocksCords.length) {
    replyMessage('Нет таких болоков поблизости');
    return;
  }

  replyMessage('Думаю...');

  await createAction({ type: 'collect', extraData: JSON.stringify({ itemChatName, count }) });

  const blocksDisplayNames = blocksTypes.map((i) => i.displayName);
  const blocksNamesString =
    blocksDisplayNames.length > 3 ? `${blocksDisplayNames.slice(0, 3).join(', ')}...` : blocksDisplayNames.join(', ');

  replyMessage(`Иду собирать ${blocksNamesString}`);

  const targets = [];
  for (let i = 0; i < Math.min(blocksCords.length, count); i++) {
    targets.push(bot.blockAt(blocksCords[i]));
  }

  const [type, tool] = blocksTypes[0]?.material?.split('/');

  // мб чекать type для чего то

  takeInventoryItem(tool);

  try {
    //@ts-ignore
    await bot.collectBlock.collect(targets);
    replyMessage('Готово');
    moveToPos(botData?.homeCords);
    replyMessage('Я домой');
  } catch (err) {
    // чекать сколько бот уже собрал
    const items = await getInventoryItems('');

    // вызывать обновленный await bot.collectBlock.collect(targets);

    console.log('Collect error:', err);
  } finally {
    await stopCollect();
  }
};

export const stopCollect = async () => {
  if (botAction.type === 'collect') {
    await endAction('collect');
    bot.pathfinder.stop();
  }
};

export const collectItemsChat = async (args: string[], username: string) => {
  const filteredArgs = args;
  let count;

  function remArg(arg: string) {
    const argIndex = filteredArgs.indexOf(arg);
    if (argIndex > -1) {
      filteredArgs.splice(argIndex, 1);
    }
  }

  for (let arg of filteredArgs) {
    if (+arg) {
      count = +arg;
      remArg(arg);
    }
  }

  await collectBlocks(filteredArgs.join(' '), count);
};

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

// // НЕ РАБОТАЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕТТТТ!!!!!!!!!!!!!!!!!!!!!!
// export const collectFood = async () => {
//   if (!checkNeedFood()) {
//     const filter = (e) =>
//       e.type === 'mob' && e.position.distanceTo(bot.entity.position) < 100 && foodMobs.includes(e.displayName);

//     const entity = bot.nearestEntity(filter);
//     if (entity) {
//       collecting = entity.displayName;
//       replyMessage('Иду добывать еду');
//       await moveToPos(entity.position);
//       await attackSome(entity);
//       // await collectFood();
//     } else replyMessage('Я не нашёл мобов для добычи еды');
//   } else {
//     replyMessage('Еды достаточно, я домой');
//     moveToPos(homePos);
//   }
// };
