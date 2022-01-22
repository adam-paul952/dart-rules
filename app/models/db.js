const mysql = require("mysql2");
const env = require("dotenv").config();

let databaseName;

if (process.env.NODE_ENV === "test") {
  databaseName = process.env.DB_TEST;
} else {
  databaseName = process.env.DB;
}

// Create connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Replace with your host
  user: process.env.DB_USER, // Replace with your user
  password: process.env.DB_PASSWORD, //  Replace with your password
  database: databaseName, // "dartscoreboardserver"
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);
});

module.exports = connection;
