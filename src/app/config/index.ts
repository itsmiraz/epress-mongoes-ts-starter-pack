import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL,
  bcrypt_salt_round: process.env.BYCRYPT_SAT_ROUND,
};
