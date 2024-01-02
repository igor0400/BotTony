import { replyMessage } from '../common/index.js';
import { ownerName } from '../../config.js';
import { commands } from './configs/index.js';
import { repliesLocale } from '../locale/index.js';

export const chatCommandsHandler = async (username: string, args: string[]) => {
  const chatCommand = args?.join(' ');
  const lowerChatCommand = args?.join(' ')?.toLowerCase();
  const { badCommand } = repliesLocale;

  if (username.toLowerCase() === ownerName.toLowerCase()) {
    for (let command in commands.private) {
      const commandData = commands.private[command];
      const titles = commandData?.titles ?? [];

      for (let title of titles) {
        const titleLen = title?.split(' ').length;
        const commandTitle = lowerChatCommand?.split(' ')?.slice(0, titleLen)?.join(' ');

        if (commandTitle === title) {
          const clearArgs = chatCommand
            .replaceAll(new RegExp(title, 'gi'), '')
            ?.trim()
            ?.split(' ')
            ?.filter((i) => !commandData?.replaceArgs?.includes(i));

          await commandData.action(clearArgs, username);
          return true;
        }
      }
    }

    replyMessage(badCommand());
    return false;
  }
};
