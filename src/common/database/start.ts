import { customRequest } from './custom-request.js';

export const startDatabase = async () => {
  await customRequest(`USE main_database`);

  await customRequest(`CREATE TABLE IF NOT EXISTS bots (
    id VARCHAR(250) PRIMARY KEY NOT NULL,
    serverHost VARCHAR(100) NOT NULL,
    serverPort VARCHAR(50) NOT NULL,
    ownerName VARCHAR(50) NOT NULL,
    botName VARCHAR(50) DEFAULT "Tony",
    lang VARCHAR(20) DEFAULT "ru",
    homeCords VARCHAR(50)
)`);

  await customRequest(`CREATE TABLE IF NOT EXISTS actions (
    id VARCHAR(250) PRIMARY KEY NOT NULL,
    botId VARCHAR(250) NOT NULL,
    type VARCHAR(250) NOT NULL,
    execNumber INT DEFAULT 1,
    extraData TEXT
)`);

  await customRequest(`CREATE TABLE IF NOT EXISTS commandsPresets (
    id VARCHAR(250) PRIMARY KEY NOT NULL,
    botId VARCHAR(250) NOT NULL,
    title VARCHAR(250) NOT NULL,
    command TEXT NOT NULL
)`);
};
