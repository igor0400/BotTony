import { CordsType, getPlayer, replyMessage } from '../common/index.js';
import { updateBotHomeCords } from './database/index.js';
import { bot } from './init.js';
import { isEntityWord, itemsLocale, repliesLocale } from '../locale/index.js';
import { endAllActions } from './index.js';

export const setHomePos = async (position: CordsType) => {
  let homePos: CordsType = position;

  if (Math.floor(position.y) !== position.y) {
    homePos = { ...position, y: position.y + 1 };
  }

  await updateBotHomeCords({ cords: `${homePos.x} ${homePos.y} ${homePos.z}` });
};

export const setHomePosChat = async (args: string[], username: string) => {
  const changedArgs = args.map((i) => (isEntityWord('me', i) ? username : i));
  const point = changedArgs[0] ?? username;

  const { newSethome } = repliesLocale;

  let cords: CordsType = getPlayer(point)?.entity?.position?.floored();

  if (isEntityWord('you', point)) {
    cords = bot?.entity?.position?.floored();
  }

  if (!cords) {
    const [x, y, z] = changedArgs;
    if (+x && +y && +z) {
      cords = { x: Math.floor(+x), y: Math.floor(+y), z: Math.floor(+z) };
    }
  }

  if (!cords) {
    cords = getPlayer(username)?.entity?.position?.floored();
  }

  await setHomePos(cords);
  replyMessage(newSethome());
};

export const lookToEntity = async (entity: any, force: boolean = false, y: number = entity?.height) => {
  if (entity) {
    await bot.lookAt(entity?.position?.offset(0, y, 0), force);
  }
};

export const lookToNearPlayer = async () => {
  const filterEntity = (entity) => entity.type === 'player' && entity.position.distanceTo(bot.entity.position) < 16;
  const entity = bot.nearestEntity(filterEntity);
  await lookToEntity(entity);
};

export const getInventoryItem = (itemChatName: string) => {
  let itemNames = getItemNames(itemChatName);

  if (itemNames.length > 1) {
    itemNames = getItemNames(itemChatName, true);
  }
  if (itemNames.length === 0) {
    itemNames = getItemNames(itemChatName);
  }

  const item = bot.inventory.items().find((item) => {
    let result = false;

    for (let itemName of itemNames) {
      if (item.name.includes(itemName) || item.displayName.toLowerCase().includes(itemName)) {
        result = true;
      }
    }

    return result;
  });

  return item;
};

function getItemNames(itemChatName: string, isStrict: boolean = false) {
  const itemNames = [itemChatName];

  for (let itemConfName in itemsLocale) {
    const itemOptionNames = itemsLocale[itemConfName];

    for (let itemOptionName of itemOptionNames) {
      if (isStrict) {
        if (new RegExp(itemOptionName, 'gi').test(itemChatName)) {
          itemNames.push(itemConfName);
        }
      } else {
        for (let itemOptionNameArg of itemOptionName.split(' ')) {
          if (
            new RegExp(itemOptionNameArg, 'gi').test(itemChatName) ||
            new RegExp(itemOptionName, 'gi').test(itemChatName)
          ) {
            itemNames.push(itemConfName);
          }
        }
      }
    }
  }

  return itemNames;
}

export const takeInventoryItem = (itemName: string, hand: 'hand' | 'off-hand' = 'hand') => {
  const item = getInventoryItem(itemName);
  if (item) bot.equip(item, hand);
};

export const stopBot = async () => {
  bot.pathfinder.stop();
  bot.pvp.stop();
  await endAllActions();
};

export const stopBotChat = async () => {
  const { stop } = repliesLocale;

  replyMessage(stop());
  await stopBot();
};
