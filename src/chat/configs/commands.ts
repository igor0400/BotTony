import { commandMiddleware } from '../../common/index.js';
import { setHomePosChat } from '../../bot/index.js';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move/index.js';
import { commandsLocale } from '../../locale/index.js';

// сделать соманды в формате дерева stop -> fight и тд
// и переделать комманды который пишутся слитно, сделать комманды по типу стоп, хватит, закончи и тд

// здороваться с подключившимися и прошаться с ушедшими!!!

// сделать команду fight

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
