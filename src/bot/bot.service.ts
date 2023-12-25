import { Position } from '../common';
import { getBotData } from './assets';
import { updateBotHomeCords } from './database';

export const setHomePos = async (position: Position) => {
  const botData = await getBotData();
  let homePos: Position = position;

  if (Math.floor(position.y) !== position.y) {
    homePos = { ...position, y: position.y + 1 };
  }

  updateBotHomeCords({ id: botData?.id, cords: `${homePos.x} ${homePos.y} ${homePos.z}` });
};
