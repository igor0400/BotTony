import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';

export const commands = {
  private: {
    sethome: {
      action: (username: string, args: string[]) => commandMiddleware(setHomePosChat, username, args),
    },
    go: {
      replaceArgs: ['to'],
      action: (username: string, args: string[]) => commandMiddleware(moveToPosChat, username, args),
    },
    follow: {
      replaceArgs: ['to'],
      action: (username: string, args: string[]) => commandMiddleware(followPlayerChat, username, args),
    },
    unfollow: {
      action: (username: string, args: string[]) => commandMiddleware(unfollowPlayerChat, username, args),
    },
  },
  public: {},
};
