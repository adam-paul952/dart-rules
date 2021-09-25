const mysql = require("mysql2");
const env = require("dotenv").config();

// Create connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);
});

module.exports = connection;
