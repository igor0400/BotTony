import { ownerName } from '../../config';
import { commands } from './configs';

export const chatCommandsHandler = async (username: string, args: string[]) => {
  const chatCommand = args[0];

  if (username.toLowerCase() === ownerName.toLowerCase()) {
    for (const command in commands.private) {
      const commandData = commands.private[command];
      const titles = commandData?.titles ?? [];

      if ([command, ...titles].includes(chatCommand)) {
        const clearArgs = args.slice(1).filter((i) => !commandData?.replaceArgs?.includes(i));

        await commandData.action(clearArgs, username);
        return true;
      }
    }
  }
};
