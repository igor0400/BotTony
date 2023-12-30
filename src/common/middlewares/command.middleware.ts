import { endAllActions } from '../../bot/index.js';

export const commandMiddleware = async (func: Function, username: string, args: string[]) => {
  try {
    await endAllActions();
    return func(username, args);
  } catch (e) {
    console.log('Command error:', e);
  }
};
