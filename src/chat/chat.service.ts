import { replyMessage } from '../common/index.js';
import { ownerName } from '../../config.js';
import { commands } from './configs/index.js';
import { repliesLocale } from '../locale/index.js';

export const chatCommandsHandler = async (username: string, args: string[]) => {
  const chatCommand = args[0]?.toLowerCase();
  const { badCommand } = repliesLocale;

  if (username.toLowerCase() === ownerName.toLowerCase()) {
    for (const command in commands.private) {
      const commandData = commands.private[command];
      const titles = commandData?.titles ?? [];

      if (titles.includes(chatCommand)) {
        const clearArgs = args.slice(1).filter((i) => !commandData?.replaceArgs?.includes(i));

        await commandData.action(clearArgs, username);
        return true;
      }
    }

    replyMessage(badCommand());
    return false;
  }
};
