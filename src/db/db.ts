import dotenv from 'dotenv';
import knex from 'knex';

// Load environment variables from .env file
dotenv.config();

// Create the knex instance using the environment variables
const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});

export default db;
