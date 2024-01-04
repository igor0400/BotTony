import { entitiesLocale } from '../commands.js';

export const changeMeOnText = (text: string, username: string) => {
  return text?.replaceAll(new RegExp(`(${entitiesLocale.me.join('|')})`, 'gi'), username);
};
