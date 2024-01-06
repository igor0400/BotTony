import { lang } from '../../config.js';

export const inventoryItems = {
  ru: {},
  en: {},
};

export const inventoryItemsLocale = inventoryItems[lang] ?? inventoryItems.ru;
