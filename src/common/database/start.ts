import { customRequest } from './custom-request.js';

export const startDatabase = async () => {
  await customRequest(`USE main_database`);

  await customRequest(`CREATE TABLE IF NOT EXISTS bots (
    id VARCHAR(250) PRIMARY KEY NOT NULL,
    serverHost VARCHAR(250) NOT NULL,
    serverPort VARCHAR(50) NOT NULL,
    ownerName VARCHAR(50) NOT NULL,
    botName VARCHAR(50) DEFAULT "Tony",
    homeCords VARCHAR(50),
    isFollow BOOLEAN DEFAULT 0,
    isGuarding BOOLEAN DEFAULT 0,
    followUserName VARCHAR(50)
)`);
};
