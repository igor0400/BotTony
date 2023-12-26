import { bot } from '../bot';
import { availableFood } from './configs';

export const checkInventoryFood = () => {
  const inventoryFood = availableFood.filter((item) => bot.inventory.items().find((elem) => elem.name.includes(item)));

  if (inventoryFood.length === 0) {
    bot.chat('У меня закончилась еда!');
  }
};
