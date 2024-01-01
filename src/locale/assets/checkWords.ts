import { entities, entitiesLocale } from '../commands.js';

export const isEntityWord = (type: keyof typeof entities.ru, word: string) => {
  return entitiesLocale[type].includes(word.toLowerCase());
};
