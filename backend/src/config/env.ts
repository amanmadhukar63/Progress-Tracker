import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;

export const PSQL_DB_URI = process.env.PSQL_DB_URI || "";

export const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';