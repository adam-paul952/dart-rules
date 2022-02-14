const mysql = require("mysql2");

const {
  databaseHost,
  databaseName,
  databaseUser,
  databasePassword,
} = require("../config/dbConfig");

// Create connection to the database
const connection = mysql.createConnection({
  host: databaseHost,
  user: databaseUser,
  password: databasePassword,
  database: databaseName,
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);
});

module.exports = connection;
