import { AbstractModel } from 'src/common';

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
  homeCords?: string;
  isFollow: boolean;
  isGuarding: boolean;
  isCollecting: boolean;
  followUserName?: string;
}
