import { AbstractModel } from '../../common/index.js';

export interface ActionCreationArgs {
  botId?: string;
  type: string;
  extraData?: string;
}

export interface ActionModel extends AbstractModel {
  botId: string;
  type: string;
  execNumber: number;
  extraData?: string;
}
