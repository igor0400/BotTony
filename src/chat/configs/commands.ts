import { setHomePosChat } from '../../bot';
import { followPlayerChat, moveToPosChat, unfollowPlayerChat } from '../../move';

export const commands = {
  private: {
    sethome: {
      action: setHomePosChat,
    },
    go: {
      replaceArgs: ['to'],
      action: moveToPosChat,
    },
    follow: {
      replaceArgs: ['to'],
      action: followPlayerChat,
    },
    unfollow: {
      action: unfollowPlayerChat,
    },
  },
  public: {},
};

// обработать действия
// если бот входит и есть какие то действия, начинать их делать
// прерывать действия при новой команде (сделать функцию для заканчивания всех действий)
