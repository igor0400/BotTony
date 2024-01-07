import { getPlayer, getPlayerWithErrMess, replyMessage } from '../common/index.js';
import { bot, createAction, endAction, getInventoryItem, lookToEntity } from '../bot/index.js';
import { changeMeOnText, repliesLocale } from '../locale/index.js';
import { moveToPosPromise } from '../move/index.js';

// распозновать itemName с пробелом
// сделать itemsLocale

export const dropItems = async (itemName: string, count?: number, entity?: any) => {
  if (entity) {
    await lookToEntity(entity, true, 0);
  }
  const item = getInventoryItem(itemName);

  const { lessItems, notFoundItem, endGeave } = repliesLocale;

  if (!item) {
    return replyMessage(notFoundItem());
  }

  setTimeout(async () => {
    if (count !== undefined && item?.count < count) {
      replyMessage(lessItems(item?.count));
      await bot.tossStack(item);
      return;
    }

    replyMessage(endGeave());
    if (count) {
      await bot.toss(item.type, item.metadata, count);
    } else {
      await bot.tossStack(item);
    }
  }, 1000);
};

export const comeAndDropItems = async (playerName: string, itemName: string, count?: number) => {
  const player = getPlayerWithErrMess(playerName);
  if (!player) return;

  const item = getInventoryItem(itemName);

  const { notFoundItem } = repliesLocale;

  if (!item) {
    return replyMessage(notFoundItem());
  }

  await createAction({
    type: 'geave',
    extraData: JSON.stringify({ playerName, itemName, count }),
  });

  await moveToPosPromise(player.entity.position.offset(1, 0, 1));

  await dropItems(itemName, count, player.entity);

  setTimeout(async () => {
    await endAction('geave');
  }, 1000);
};

export const comeAndDropItemsChat = async (args: string[], username: string) => {
  const data = getCADIDataByArgs(args, username);
  if (!data) return;

  const { startGeave } = repliesLocale;
  const { playerName, itemName, count } = data;

  replyMessage(startGeave());
  await comeAndDropItems(playerName, itemName, count);
};

function getCADIDataByArgs(args: string[], username: string) {
  let playerName: string;
  let itemName: string;
  let count: number;

  const filteredArgs = JSON.parse(JSON.stringify(args));

  function remArg(arg: string) {
    const argIndex = filteredArgs.indexOf(arg);
    if (argIndex > -1) {
      filteredArgs.splice(argIndex, 1);
    }
  }

  const { notFoundPlayer, badComeAndGeaveArgs } = repliesLocale;

  if (filteredArgs.length < 1) {
    replyMessage(badComeAndGeaveArgs());
    return false;
  }

  if (filteredArgs.length >= 2) {
    for (let i in filteredArgs) {
      const arg = filteredArgs[i];
      const testPlayerName = changeMeOnText(arg, username);
      const isPlayer = getPlayer(testPlayerName);

      if (isPlayer) {
        playerName = testPlayerName;
        remArg(arg);
      }
    }
  }

  // сделать через remArg
  // сначала чекать count а потом itemName
  // поменять проверки на argsLen

  if (+filteredArgs[0]) {
    count = +filteredArgs[0];
    itemName = filteredArgs[1];
  } else {
    count = +filteredArgs[1];
    itemName = filteredArgs[0];
  }

  if (!playerName) {
    const argsLen = args.length;

    if (argsLen === 1 || (argsLen === 2 && count)) {
      playerName = username;
    } else {
      replyMessage(notFoundPlayer());
      return false;
    }
  }

  return { playerName, itemName, count };
}
