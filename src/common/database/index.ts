import * as mysql from 'mysql2';
import { databaseHost, databaseName, databasePassword, databasePort, databaseUser } from '../../../config.js';

export const dbConfig = {
  host: databaseHost,
  port: databasePort,
  user: databaseUser,
  password: databasePassword,
  database: databaseName,
};

const poolDbConfig = {
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 50,
  idleTimeout: 60000,
  queueLimit: 10,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
};

export const connection = mysql.createConnection(dbConfig);
// export const pool = mysql.createPool(poolDbConfig);
// export const connection = await pool.promise().getConnection();

export * from './custom-request.js';
export * from './start.js';
