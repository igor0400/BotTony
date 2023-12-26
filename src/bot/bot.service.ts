import { Position } from '../common';
import { updateBotHomeCords } from './database';
import { bot, botData } from './init';

export const setHomePos = async (position: Position) => {
  let homePos: Position = position;

  if (Math.floor(position.y) !== position.y) {
    homePos = { ...position, y: position.y + 1 };
  }

  await updateBotHomeCords({ id: botData?.id, cords: `${homePos.x} ${homePos.y} ${homePos.z}` });
};

export const lookForPlayer = async () => {
  const filterEntity = (entity) => entity.type === 'player' && entity.position.distanceTo(bot.entity.position) < 16;
  const entity = bot.nearestEntity(filterEntity);
  if (entity) {
    bot.lookAt(entity.position.offset(0, entity.height, 0));
  }
};
