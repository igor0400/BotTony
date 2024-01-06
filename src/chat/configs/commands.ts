import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat, stopBotChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';
import { commandsLocale } from '../../locale/index.js';
import { fightPlayerChat, stopFightPlayerChat } from '../../fight/index.js';
import { CommandType } from '../types/index.js';
import { endGuardingChat, startGuardingChat } from '../../guard/index.js';
import { whereChat } from '../../other/index.js';
import { comeAndDropItemsChat } from '../../collect/index.js';

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
      action: (...args) => commandMiddleware(setHomePosChat, ...args),
    },
    go: {
      ...commandsLocale.go,
      action: (...args) => commandMiddleware(moveToPosChat, ...args),
    },
    follow: {
      ...commandsLocale.follow,
      action: (...args) => commandMiddleware(followPlayerChat, ...args),
    },
    unfollow: {
      ...commandsLocale.unfollow,
      action: (...args) => commandMiddleware(unfollowPlayerChat, ...args),
    },
    fight: {
      ...commandsLocale.fight,
      action: (...args) => commandMiddleware(fightPlayerChat, ...args),
    },
    stopfight: {
      ...commandsLocale.stopfight,
      action: (...args) => commandMiddleware(stopFightPlayerChat, ...args),
    },
    guard: {
      ...commandsLocale.guard,
      action: (...args) => commandMiddleware(startGuardingChat, ...args),
    },
    unguard: {
      ...commandsLocale.unguard,
      action: (...args) => commandMiddleware(endGuardingChat, ...args),
    },
    where: {
      ...commandsLocale.where,
      action: (...args) => commandMiddleware(whereChat, ...args),
    },
    geave: {
      ...commandsLocale.geave,
      action: (...args) => commandMiddleware(comeAndDropItemsChat, ...args),
    },

    stop: {
      ...commandsLocale.stop,
      action: (...args) => commandMiddleware(stopBotChat, ...args),
    },
  },
  public: {},
};
