import pkg from 'pg';
import { PSQL_DB_URI } from "../config/env.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: PSQL_DB_URI,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;