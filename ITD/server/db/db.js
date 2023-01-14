const dotenv = require('dotenv')
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../..', '.env') });

const Pool = require("pg").Pool;

console.log(process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_HOST)

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'postgres',
  port: 5432,
  database: "eMall",
});

module.exports = pool;