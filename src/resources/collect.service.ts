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
  const validActions = ['fight', 'guard'];

  if (!botAction?.type || validActions.includes(botAction?.type)) {
    // взять оружие
    setTimeout(() => {
      const isSword = takeInventoryItem('sword');
      if (!isSword) takeInventoryItem('axe');
    }, 150);

    // взять щит
    setTimeout(() => takeInventoryItem('shield', 'off-hand'), 250);
  }
};

// перевести сообщения
// сделать continue

// собирать ресы и если надо складывать в сундук, если его там нет -> ставить, если нет ресов на сундук -> нарубить

// собирать шерсть
// просклонять items

export const collectBlocks = async (itemChatName: string, count = 1, isSendErrors = true) => {
  const itemNames = getItemNamesByChatName(itemChatName);

  const blocksTypes = [];

  for (let blockName in mcData.blocksByName) {
    for (let itemName of itemNames) {
      if (blockName.includes(itemName)) {
        blocksTypes.push(mcData.blocksByName[blockName]);
      }
    }
  }

  if (!blocksTypes.length && isSendErrors) {
    return replyMessage('Я не знаю блоков с таким названием');
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

  if (!blocksCords.length && isSendErrors) {
    return replyMessage('Нет таких болоков поблизости');
  }

  const targets = [];
  for (let i = 0; i < Math.min(blocksCords.length, count); i++) {
    targets.push(bot.blockAt(blocksCords[i]));
  }

  if (isSendErrors) {
    await createAction({ type: 'collect', extraData: JSON.stringify({ itemChatName, count }) });

    const blocksDisplayNames = blocksTypes.map((i) => i.displayName);
    const blocksNamesString =
      blocksDisplayNames.length > 3 ? `${blocksDisplayNames.slice(0, 3).join(', ')}...` : blocksDisplayNames.join(', ');

    replyMessage(`Иду собирать ${blocksNamesString}`);
  }

  const [type, tool] = blocksTypes[0]?.material?.split('/');

  takeInventoryItem(tool);

  try {
    //@ts-ignore
    await bot.collectBlock.collect(targets);
    replyMessage('Готово');
    moveToPos(botData?.homeCords);
    replyMessage('Я домой');
  } catch (err) {
    const alreadyCollectedItems = [];

    for (let block of blocksTypes) {
      const items = getInventoryItems(block?.name);
      alreadyCollectedItems.push(...items);
    }

    const updatedCount = count - alreadyCollectedItems.length;

    if (updatedCount > 0) {
      return await collectBlocks(itemChatName, updatedCount, false);
    }
  } finally {
    await stopCollect();
  }
};

export const stopCollect = async () => {
  if (botAction.type === 'collect') {
    await endAction('collect');
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

  // если это еда, вызывать collectFood

  bot.chat('Ищу...');

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
