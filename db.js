require("dotenv").config();
const mysql = require("mysql");

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD, DB_PORT } = process.env;

const config = {
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
};
const connection = mysql.createConnection(config);

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else console.log("Database connected");
});

module.exports = connection;
