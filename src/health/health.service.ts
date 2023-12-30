import { bot } from '../bot/index.js';
import { availableFood } from './configs/index.js';

export const checkInventoryFood = () => {
  const inventoryFood = availableFood.filter((item) => bot.inventory.items().find((elem) => elem.name.includes(item)));

  if (inventoryFood.length === 0) {
    bot.chat('У меня закончилась еда!');
  }
};