const dotenv = require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });

const Pool = require("pg").Pool;

/**
 * This class is used to manage the connection to the database. It uses the environment variables to connect to the database.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'postgres',
  port: 5432,
  database: "eMall",
});

module.exports = pool;