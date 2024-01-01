import { connection } from './index.js';

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
    const [result] = await connection.promise().query(reqStr + addLimit + addOffset);

    return result;
  } catch (e) {
    console.log('REQUSET ERROR: ', e);
  }
};
