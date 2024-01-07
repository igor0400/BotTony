import { lang } from '../../config.js';

const items = {
  ru: {},
  en: {},
};

export const itemsLocale = items[lang] ?? items.ru;
