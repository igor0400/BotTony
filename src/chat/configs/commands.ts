import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';
import { commandsLocale } from '../../locale/index.js';

export const commands = {
  private: {
    sethome: {
      ...commandsLocale.sethome,
      action: (username: string, args: string[]) => commandMiddleware(setHomePosChat, username, args),
    },
    go: {
      ...commandsLocale.go,
      action: (username: string, args: string[]) => commandMiddleware(moveToPosChat, username, args),
    },
    follow: {
      ...commandsLocale.follow,
      action: (username: string, args: string[]) => commandMiddleware(followPlayerChat, username, args),
    },
    unfollow: {
      ...commandsLocale.unfollow,
      action: (username: string, args: string[]) => commandMiddleware(unfollowPlayerChat, username, args),
    },
  },
  public: {},
};
