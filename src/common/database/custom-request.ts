import { pool } from './index';

interface Options {
  limit: number;
  offset: number;
}

export const customRequest = async (reqStr: string, otps?: Options) => {
  const limit = otps?.limit;
  const offset = otps?.offset;
  const addLimit = limit ? ` LIMIT ${limit}` : '';
  const addOffset = offset ? ` OFFSET ${offset}` : '';

  try {
    const connection = await pool.promise().getConnection();
    const [result] = await connection.query(reqStr + addLimit + addOffset);

    return result;
  } catch (e) {
    console.log('REQUSET ERROR: ', e);
  }
};
