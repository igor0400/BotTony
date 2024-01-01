import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../locale/move/index.js';
import { commandsLocale } from '../../locale/index.js';

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
  },
  public: {},
};
