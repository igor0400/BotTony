import { replyMessage } from '../common/index.js';
import { ownerName } from '../../config.js';
import { commands } from './configs/index.js';
import { repliesLocale } from '../locale/index.js';
import { CommandType } from './types/commands.js';

export const chatCommandsHandler = async (username: string, args: string[]) => {
  const chatCommand = args?.join(' ')?.toLowerCase();

  if (username.toLowerCase() === ownerName.toLowerCase()) {
    const validCommands = { ...commands.private, ...commands.public };
    return await commandHandler(chatCommand, username, validCommands);
  } else {
    return await commandHandler(chatCommand, username, commands.public);
  }
};

async function commandHandler(
  chatCommand: string,
  username: string,
  validCommands: {
    [key: string]: CommandType;
  },
) {
  const { badCommand } = repliesLocale;

  for (let command in validCommands) {
    const commandData = validCommands[command];
    const titles = commandData?.titles ?? [];

    for (let title of titles) {
      const titleLen = title?.split(' ').length;
      const commandTitle = chatCommand?.split(' ')?.slice(0, titleLen)?.join(' ');

      if (commandTitle === title) {
        const clearArgs = chatCommand
          .replaceAll(new RegExp(title, 'gi'), '')
          ?.trim()
          ?.split(' ')
          ?.filter((i) => !commandData?.replaceArgs?.includes(i) && i);

        await commandData.action(clearArgs, username);
        return true;
      }
    }
  }

  replyMessage(badCommand());
  return false;
}
