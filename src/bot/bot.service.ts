import { CordsType, getPlayer, replyMessage } from '../common/index.js';
import { updateBotHomeCords } from './database/index.js';
import { bot } from './init.js';
import { isEntityWord, repliesLocale } from '../locale/index.js';
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

export const lookToNearPlayer = async () => {
  const filterEntity = (entity) => entity.type === 'player' && entity.position.distanceTo(bot.entity.position) < 16;
  const entity = bot.nearestEntity(filterEntity);
  if (entity) {
    bot.lookAt(entity.position.offset(0, entity.height, 0));
  }
};

export const getInventoryItem = (itemName: string) => {
  const item = bot.inventory.items().find((item) => item.name.includes(itemName));
  return item;
};

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
