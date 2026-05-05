import { Client } from 'pg';
import { PSQL_DB_URI } from "../config/env.js";

const pgClient = new Client(PSQL_DB_URI);

export default pgClient;