import 'dotenv/config';

// bot
export const botHost = process.env.BOT_HOST;
export const botPort = +process.env.BOT_PORT;
export const botName = process.env.BOT_NAME ?? 'Tony';
export const ownerName = process.env.OWNER_NAME ?? 'Swingor';

// database
export const databaseHost = process.env.DATABASE_HOST ?? 'localhost';
export const databasePort = +process.env.DATABASE_PORT ?? 3306;
export const databaseUser = process.env.DATABASE_USER ?? 'MainUser';
export const databaseName = process.env.DATABASE_NAME ?? 'main_database';
export const databasePassword =
  process.env.DATABASE_PASSWORD ?? 'dkfjsdofnsofnmno5j84584nknvkIDJFIDOFJODS&&&***&(hjhdfkldf';
