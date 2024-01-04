export interface CommandType {
  titles: string[];
  replaceArgs: string[];
  action: (args: string[], username: string) => void | Promise<any>;
}
