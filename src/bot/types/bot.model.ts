import { AbstractModel, CordsType } from '../../common';

export interface BotCreationArgs {
  serverHost: string;
  serverPort: string | number;
  ownerName: string;
  botName?: string;
}

export interface BotModel extends AbstractModel {
  serverHost: string;
  serverPort: string | number;
  ownerName: string;
  botName: string;
  lang: 'ru' | 'en';
  homeCords?: CordsType;
  isFollow: boolean;
  isGuarding: boolean;
  isCollecting: boolean;
  followUserName?: string;
}
