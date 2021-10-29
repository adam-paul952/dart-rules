const mysql = require("mysql2");
const env = require("dotenv").config();

// Create connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Replace with your host
  user: process.env.DB_USER, // Replace with your user
  password: process.env.DB_PASSWORD, //  Replace with your password
});

connection.connect((error) => {
  if (error) throw error;
  console.log(`Successfully connected to database`);

  connection.query(
    "CREATE DATABASE dartscoreboardserver",
    function (err, result) {
      if (err) throw err;
      console.log("Database created");

      connection.end(function (err) {
        if (err) {
          return console.log(err.message);
        }
        console.log(`Connection ended`);
      });
    }
  );
});
