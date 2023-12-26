import { CordsType, replyMessage } from '../common';
import { updateBotHomeCords } from './database';
import { bot } from './init';

export const setHomePos = async (position: CordsType) => {
  let homePos: CordsType = position;

  if (Math.floor(position.y) !== position.y) {
    homePos = { ...position, y: position.y + 1 };
  }

  await updateBotHomeCords({ cords: `${homePos.x} ${homePos.y} ${homePos.z}` });
};

export const setHomePosChat = async (args: string[], username: string) => {
  const changedArgs = args.map((i) => (i === 'me' ? username : i));
  const point = changedArgs[0] ?? username;

  let cords: CordsType = bot?.players[point]?.entity?.position?.floored();

  if (point.toLowerCase() === 'you' || point.toLowerCase() === 'u') {
    cords = bot?.entity?.position?.floored();
  }

  if (!cords) {
    const [x, y, z] = changedArgs;
    if (x && y && z) {
      cords = { x: Math.floor(+x), y: Math.floor(+y), z: Math.floor(+z) };
    }
  }

  if (!cords) {
    cords = bot?.players[username]?.entity?.position?.floored();
  }

  await setHomePos(cords);
  replyMessage('Я запомнил новую точку дома!');
};

export const lookForPlayer = async () => {
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
