import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat, stopBotChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';
import { commandsLocale } from '../../locale/index.js';
import { fightPlayerChat, stopFightPlayerChat } from '../../fight/index.js';
import { CommandType } from '../types/commands.js';

interface CommandsType {
  private: {
    [key: string]: CommandType;
  };
  public: {
    [key: string]: CommandType;
  };
}

export const commands: CommandsType = {
  private: {
    sethome: {
      ...commandsLocale.sethome,
      action: (args: string[], username: string) => commandMiddleware(setHomePosChat, args, username),
    },
    go: {
      ...commandsLocale.go,
      action: (args: string[], username: string) => commandMiddleware(moveToPosChat, args, username),
    },
    follow: {
      ...commandsLocale.follow,
      action: (args: string[], username: string) => commandMiddleware(followPlayerChat, args, username),
    },
    unfollow: {
      ...commandsLocale.unfollow,
      action: (args: string[], username: string) => commandMiddleware(unfollowPlayerChat, args, username),
    },
    fight: {
      ...commandsLocale.fight,
      action: (args: string[], username: string) => commandMiddleware(fightPlayerChat, args, username),
    },
    stopfight: {
      ...commandsLocale.stopfight,
      action: (args: string[], username: string) => commandMiddleware(stopFightPlayerChat, args, username),
    },
    stop: {
      ...commandsLocale.stop,
      action: (args: string[], username: string) => commandMiddleware(stopBotChat, args, username),
    },
  },
  public: {},
};
