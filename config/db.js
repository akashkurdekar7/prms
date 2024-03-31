import dotenv from "dotenv";
import mysql from "mysql";
import { promisify } from "util";

dotenv.config();
const mysqlPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

// Promisify the query method of mysqlPool
const query = promisify(mysqlPool.query).bind(mysqlPool);

export default query;
