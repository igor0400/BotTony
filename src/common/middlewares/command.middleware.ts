export const commandMiddleware = async (func: Function, args: string[], username: string) => {
  try {
    return await func(args, username);
  } catch (e) {
    console.log('Command error:', e);
  }
};
