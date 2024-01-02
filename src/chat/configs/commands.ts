import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';
import { commandsLocale } from '../../locale/index.js';
import { fightPlayerChat, stopFightPlayerChat } from '../../fight/index.js';

export const commands = {
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
  },
  public: {},
};
